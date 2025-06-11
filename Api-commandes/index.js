const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();

app.use(express.json());

// Exemple de données en mémoire
let commandes = [
    { id: 1, produit: 1, quantite: 2, statut: 'en attente' },
    { id: 2, produit: 2, quantite: 5, statut: 'expédiée' }
];

// Obtenir toutes les commandes
app.get('/commandes', (req, res) => {
    res.json(commandes);
});

// Obtenir une commande par ID
app.get('/commandes/:id', (req, res) => {
    const commande = commandes.find(c => c.id === parseInt(req.params.id));
    if (!commande) return res.status(404).json({ message: 'Commande non trouvée' });
    res.json(commande);
});

// Créer une nouvelle commande
app.post('/commandes', async (req, res) => {
      try {
    const { produitId, qte, statut } = req.body;
    console.log('Produit PORT: ' + process.env.PORT_API_PRODUIT + ' produitId: ' + produitId + ' qte: ' + qte + ' statut: ' + statut);
    const response = await axios.get(`http://localhost:${process.env.PORT_API_PRODUIT}/produits/${produitId}`);
    const produit = response.data;
    console.log('Produit price: ' + produit.prix);
    if(!produit) return res.status(404).json({ message: 'Produit non trouvé' });
    const nouvelleCommande = {
        id: commandes.length + 1,       
        prixTotal : produit.prix * qte,
        statut: statut,       
    };
    commandes.push(nouvelleCommande);
    res.status(201).json(nouvelleCommande);
 } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

// Mettre à jour une commande
app.put('/commandes/:id', (req, res) => {
    const commande = commandes.find(c => c.id === parseInt(req.params.id));
    if (!commande) return res.status(404).json({ message: 'Commande non trouvée' });
    commande.produit = req.body.produit || commande.produit;
    commande.quantite = req.body.quantite || commande.quantite;
    commande.statut = req.body.statut || commande.statut;
    res.json(commande);
});

// Supprimer une commande
app.delete('/commandes/:id', (req, res) => {
    const index = commandes.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Commande non trouvée' });
    commandes.splice(index, 1);
    res.status(204).send();
});

// Démarrer le serveur
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});