# Utilise une image Node officielle
#use node version alpine : Le mot alpine signifie que tu utilises une image Node.js basée sur Alpine Linux.
FROM node:22-alpine

# Crée le dossier de l'app
WORKDIR /usr/src/app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install --production

# Copie le reste du code
COPY . .

# Expose le port (utilise la variable d'environnement PORT si définie)
EXPOSE 4001

# Commande de démarrage
CMD [ "npm", "start" ]