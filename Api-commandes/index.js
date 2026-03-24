const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

// ----- Connexion MongoDB -----
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.error('Erreur MongoDB :', err));

// ----- Schéma et modèle Mongoose -----
const commandeSchema = new mongoose.Schema({
  produitId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Produit', required: true },
  quantite:      { type: Number, required: true },
  prixTotal:     { type: Number, required: true },
  statut:        { type: String, enum: ['en attente', 'expédiée', 'livrée', 'annulée'], default: 'en attente' },
  clientNom:     { type: String, required: true },
  clientEmail:   { type: String, required: true },
  dateCommande:  { type: Date, default: Date.now }
});

const Commande = mongoose.model('Commande', commandeSchema);

// ----- Routes -----

// GET /commandes - liste toutes les commandes
app.get('/commandes', async (req, res) => {
  const commandes = await Commande.find();
  res.json(commandes);
});

// GET /commandes/:id - récupère une commande par ID
app.get('/commandes/:id', async (req, res) => {
  const commande = await Commande.findById(req.params.id);
  if (!commande) return res.status(404).json({ message: 'Commande non trouvée' });
  res.json(commande);
});

// POST /commandes - crée une nouvelle commande
app.post('/commandes', async (req, res) => {
  try {
    const { produitId, quantite, statut, clientNom, clientEmail } = req.body;

    // Appel vers Api-produits pour récupérer le prix
    const response = await axios.get(`http://produit-api:${process.env.PORT_API_PRODUIT}/produits/${produitId}`);
    const produit = response.data;

    const commande = new Commande({
      produitId,
      quantite,
      prixTotal: produit.prix * quantite,
      statut,
      clientNom,
      clientEmail
    });

    await commande.save();
    res.status(201).json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /commandes/:id - met à jour une commande
app.put('/commandes/:id', async (req, res) => {
  const { quantite, statut, clientNom, clientEmail } = req.body;
  const commande = await Commande.findByIdAndUpdate(
    req.params.id,
    { quantite, statut, clientNom, clientEmail },
    { new: true }
  );
  if (!commande) return res.status(404).json({ message: 'Commande non trouvée' });
  res.json(commande);
});

// DELETE /commandes/:id - supprime une commande
app.delete('/commandes/:id', async (req, res) => {
  const commande = await Commande.findByIdAndDelete(req.params.id);
  if (!commande) return res.status(404).json({ message: 'Commande non trouvée' });
  res.status(204).send();
});

// ----- Démarrage -----
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`API Commandes démarrée sur le port ${PORT}`);
});
