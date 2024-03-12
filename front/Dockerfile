# Utiliser l'image Node pour construire l'application
FROM node:14 AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier package.json et package-lock.json pour installer les dépendances
COPY package.json .
COPY package-lock.json .

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application en mode production
RUN npm run build

# Utiliser l'image légère de Nginx pour servir l'application construite
FROM nginx:alpine

# Install Certbot
RUN apt-get update && \
    apt-get install -y certbot && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copier les fichiers construits de l'étape précédente vers le répertoire de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposer le port 80 (par défaut pour HTTP)
EXPOSE 80
EXPOSE 443

# Request SSL certificates using Certbot
RUN certbot certonly --standalone -d gaminspot.games -d www.gaminspot.games --non-interactive --agree-tos -m maximerene.durand.pro@gmail.com

# Commande pour démarrer Nginx une fois le conteneur lancé
CMD ["nginx", "-g", "daemon off;"]
