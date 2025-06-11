const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.json());

// Liste des produits (exemple en mémoire)
let produits = [
  { id: 1, nom: 'Produit 1', prix: 10 },
  { id: 2, nom: 'Produit 2', prix: 20 }
];

// GET /produits - liste tous les produits
app.get('/produits', (req, res) => {
  res.json(produits);
});

// GET /produits/:id - récupère un produit par ID
app.get('/produits/:id', (req, res) => {
  const produit = produits.find(p => p.id === parseInt(req.params.id));
  if (!produit) return res.status(404).send('Produit non trouvé');
  res.json(produit);
});

// POST /produits - ajoute un nouveau produit
app.post('/produits', (req, res) => {
  const { nom, prix } = req.body;
  const nouveauProduit = {
    id: produits.length + 1,
    nom,
    prix
  };
  produits.push(nouveauProduit);
  res.status(201).json(nouveauProduit);
});

// PUT /produits/:id - modifie un produit existant
app.put('/produits/:id', (req, res) => {
  const produit = produits.find(p => p.id === parseInt(req.params.id));
  if (!produit) return res.status(404).send('Produit non trouvé');
  const { nom, prix } = req.body;
  produit.nom = nom;
  produit.prix = prix;
  res.json(produit);
});

// DELETE /produits/:id - supprime un produit
app.delete('/produits/:id', (req, res) => {
  const index = produits.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Produit non trouvé');
  produits.splice(index, 1);
  res.status(204).send();
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Produit démarré sur le port ${PORT}`);
});