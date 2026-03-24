const mongoose = require('mongoose');
require('dotenv').config();

const produitSchema = new mongoose.Schema({
  nom:         { type: String, required: true },
  description: { type: String, required: true },
  prix:        { type: Number, required: true },
  stock:       { type: Number, required: true, default: 0 },
  categorie:   { type: String, required: true },
  image:       { type: String }
});

const Produit = mongoose.model('Produit', produitSchema);

const produits = [
  {
    nom: 'MacBook Pro 14"',
    description: 'Ordinateur portable Apple avec puce M3 Pro, 18 Go RAM, 512 Go SSD. Performances exceptionnelles pour les professionnels.',
    prix: 2199,
    stock: 12,
    categorie: 'Informatique',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80'
  },
  {
    nom: 'Clavier mécanique Keychron K2',
    description: 'Clavier mécanique compact 75%, switches Brown, rétroéclairage RGB, compatible Mac et Windows.',
    prix: 89,
    stock: 45,
    categorie: 'Informatique',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80'
  },
  {
    nom: 'Souris Logitech MX Master 3',
    description: 'Souris ergonomique sans fil, capteur 4000 DPI, molette MagSpeed, autonomie 70 jours.',
    prix: 99,
    stock: 30,
    categorie: 'Informatique',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80'
  },
  {
    nom: 'Écran Dell UltraSharp 27"',
    description: 'Moniteur 4K UHD IPS, 60Hz, 5ms, USB-C 90W, idéal pour la productivité et le design.',
    prix: 549,
    stock: 8,
    categorie: 'Informatique',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a573d5f5ec?w=600&q=80'
  },
  {
    nom: 'Sony WH-1000XM5',
    description: 'Casque audio sans fil à réduction de bruit active, 30h d\'autonomie, son Hi-Res certifié.',
    prix: 349,
    stock: 20,
    categorie: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'
  },
  {
    nom: 'AirPods Pro 2',
    description: 'Écouteurs sans fil Apple avec réduction de bruit adaptative, audio spatial et boîtier MagSafe.',
    prix: 279,
    stock: 35,
    categorie: 'Audio',
    image: 'https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=600&q=80'
  },
  {
    nom: 'iPhone 15 Pro',
    description: 'Smartphone Apple, puce A17 Pro, appareil photo 48 MP, titane, Dynamic Island, USB-C.',
    prix: 1229,
    stock: 18,
    categorie: 'Téléphonie',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80'
  },
  {
    nom: 'Samsung Galaxy S24 Ultra',
    description: 'Smartphone Android haut de gamme, S Pen intégré, capteur 200 MP, écran Dynamic AMOLED 6.8".',
    prix: 1319,
    stock: 15,
    categorie: 'Téléphonie',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80'
  },
  {
    nom: 'iPad Air 11" M2',
    description: 'Tablette Apple avec puce M2, écran Liquid Retina 11", compatible Apple Pencil Pro et Magic Keyboard.',
    prix: 799,
    stock: 22,
    categorie: 'Tablettes',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80'
  },
  {
    nom: 'Disque SSD Samsung T7 1To',
    description: 'SSD externe portable USB 3.2, vitesses jusqu\'à 1050 Mo/s, compact et résistant aux chocs.',
    prix: 89,
    stock: 60,
    categorie: 'Stockage',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&q=80'
  },
  {
    nom: 'Webcam Logitech Brio 4K',
    description: 'Webcam 4K Ultra HD, autofocus avancé, HDR, compatible Teams et Zoom, idéale pour le télétravail.',
    prix: 199,
    stock: 25,
    categorie: 'Informatique',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80'
  },
  {
    nom: 'Chargeur USB-C 100W Anker',
    description: 'Chargeur compact GaN 100W, 4 ports (2 USB-C + 2 USB-A), charge rapide pour tous vos appareils.',
    prix: 49,
    stock: 80,
    categorie: 'Accessoires',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80'
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connecté à MongoDB');

    await Produit.deleteMany({});
    console.log('Anciens produits supprimés');

    await Produit.insertMany(produits);
    console.log(`${produits.length} produits insérés avec succès`);

  } catch (err) {
    console.error('Erreur :', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Déconnecté de MongoDB');
  }
}

seed();
