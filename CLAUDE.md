# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Application e-commerce éducative basée sur une architecture microservices. Trois services Node.js/Express avec MongoDB et un frontend React/Vite, orchestrés via Docker Compose.

## Running the services

**Via Docker Compose (recommended) :**
```bash
docker-compose up --build
```

**Alimenter la base avec les données de test :**
```bash
docker cp Api-produits/seed.js store-produit-api-1:/usr/src/app/seed.js
docker exec store-produit-api-1 node seed.js
```

**Localement (MongoDB doit tourner sur localhost:27017) :**
```bash
cd Api-produits   && npm install && npm start
cd Api-commandes  && npm install && npm start
cd front-produits && npm install && npm run dev
```

## Architecture

```
mongodb           (port 27017)  — base de données partagée, volume persistant mongo_data
Api-produits      (port 4000)   — CRUD /produits[/:id]
Api-commandes     (port 4001)   — CRUD /commandes[/:id]
                                   POST /commandes → appelle produit-api:4000 via axios
                                                     pour calculer prixTotal = prix * quantite
front-produits    (port 5173)   — Interface React/Vite
                                   proxy /produits → produit-api:4000 (Docker)
                                                  → localhost:4000   (local)
```

## Base de données

- MongoDB 7 via Docker, URI : `mongodb://mongodb:27017/store`
- ORM : Mongoose 8
- Les données sont persistées dans le volume Docker `mongo_data`

**Modèles Mongoose :**

`Produit` : `{ nom, description, prix, stock, categorie, image }`
`Commande` : `{ produitId (ObjectId ref Produit), quantite, prixTotal, statut (enum), clientNom, clientEmail, dateCommande }`

Statuts valides pour une commande : `"en attente"` | `"expédiée"` | `"livrée"` | `"annulée"`

## Frontend React (front-produits)

- **Vite** + React 18, port 3000 dans le container (exposé sur 5173 en dehors)
- Proxy Vite : `/produits` → `process.env.API_URL || 'http://localhost:4000'`
- Structure des composants :
  - `App.jsx` — état global, orchestration
  - `components/ProductList.jsx` — grille de produits
  - `components/ProductCard.jsx` — carte produit avec actions
  - `components/ProductForm.jsx` — formulaire ajout / modification
  - `components/Modal.jsx` — modale réutilisable
  - `services/api.js` — toutes les fonctions fetch vers l'API

## Variables d'environnement

| Variable | Api-produits | Api-commandes | front-produits |
|---|---|---|---|
| `PORT` | 4000 | 4001 | — |
| `MONGO_URI` | mongodb://mongodb:27017/store | mongodb://mongodb:27017/store | — |
| `PORT_API_PRODUIT` | — | 4000 | — |
| `API_URL` | — | — | http://produit-api:4000 |

En local, les `.env` utilisent `mongodb://localhost:27017/store` et `API_URL` n'est pas défini (fallback sur `localhost:4000`).
