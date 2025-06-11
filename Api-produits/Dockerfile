# Utilise une image Node officielle
FROM node:22

# Crée le dossier de l'app
WORKDIR /usr/src/app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install --production

# Copie le reste du code
COPY . .

# Expose le port (utilise la variable d'environnement PORT si définie)
EXPOSE 4000

# Commande de démarrage
CMD [ "npm", "start" ]