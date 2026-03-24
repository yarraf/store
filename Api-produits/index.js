const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// ----- Connexion MongoDB -----
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.error('Erreur MongoDB :', err));

// ----- Schéma et modèle Mongoose -----
const produitSchema = new mongoose.Schema({
  nom:         { type: String, required: true },
  description: { type: String, required: true },
  prix:        { type: Number, required: true },
  stock:       { type: Number, required: true, default: 0 },
  categorie:   { type: String, required: true },
  image:       { type: String, required: false }
});

const Produit = mongoose.model('Produit', produitSchema);

// ----- Routes -----

// GET /produits - liste tous les produits
app.get('/produits', async (req, res) => {
  const produits = await Produit.find();
  res.json(produits);
});

// GET /produits/:id - récupère un produit par ID
app.get('/produits/:id', async (req, res) => {
  const produit = await Produit.findById(req.params.id);
  if (!produit) return res.status(404).json({ message: 'Produit non trouvé' });
  res.json(produit);
});

// POST /produits - ajoute un nouveau produit
app.post('/produits', async (req, res) => {
  const { nom, description, prix, stock, categorie, image } = req.body;
  const produit = new Produit({ nom, description, prix, stock, categorie, image });
  await produit.save();
  res.status(201).json(produit);
});

// PUT /produits/:id - modifie un produit existant
app.put('/produits/:id', async (req, res) => {
  const { nom, description, prix, stock, categorie, image } = req.body;
  const produit = await Produit.findByIdAndUpdate(
    req.params.id,
    { nom, description, prix, stock, categorie, image },
    { new: true }
  );
  if (!produit) return res.status(404).json({ message: 'Produit non trouvé' });
  res.json(produit);
});

// DELETE /produits/:id - supprime un produit
app.delete('/produits/:id', async (req, res) => {
  const produit = await Produit.findByIdAndDelete(req.params.id);
  if (!produit) return res.status(404).json({ message: 'Produit non trouvé' });
  res.status(204).send();
});

// ----- Démarrage -----
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API Produits démarrée sur le port ${PORT}`);
});
