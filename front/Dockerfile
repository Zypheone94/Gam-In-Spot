# Stage 1: Build
FROM node:14 as build

# Crée et définis le répertoire de travail dans le conteneur
WORKDIR /app/front

# Copie le fichier package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers de l'application dans le conteneur
# COPY . .

# Exécute la construction de l'application React
RUN npm run build

# Stage 2: Production
FROM node:14

# Crée et définis le répertoire de travail dans le conteneur
WORKDIR /app/front

# Copie uniquement les fichiers nécessaires à partir de la première étape (build)
COPY --from=build /app/front/build /app/front/build

# Exposer le port sur lequel l'application va écouter
EXPOSE 80

# Commande de démarrage pour lancer l'application lorsqu'un conteneur est démarré
CMD ["npm", "run", "run"]