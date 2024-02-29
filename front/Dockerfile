# Stage 1: Build
FROM node:14 as build

# Crée et définis le répertoire de travail dans le conteneur
WORKDIR /app/front

# Copie le fichier package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers de l'application dans le conteneur
COPY . .

# Exécute la construction de l'application React
RUN npm run build

# Stage 2: Production
FROM nginx:latest

# Crée et définis le répertoire de travail dans le conteneur
WORKDIR /usr/share/nginx/html

# Copie uniquement les fichiers nécessaires à partir de la première étape (build)
COPY --from=build /app/front/build /usr/share/nginx/html

# Copie le fichier de configuration Nginx personnalisé
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose le port 80
EXPOSE 80

# Commande de démarrage pour lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
