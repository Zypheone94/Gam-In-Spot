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

# Utiliser une image légère d'Apache pour servir l'application construite
FROM httpd:alpine

# Copier les fichiers construits de l'étape précédente vers le répertoire d'Apache
COPY --from=builder /app/dist /usr/local/apache2/htdocs

# Exposer le port 80 (par défaut pour HTTP)
EXPOSE 80

# Vous pouvez également personnaliser la configuration d'Apache si nécessaire
# COPY apache-config.conf /usr/local/apache2/conf/httpd.conf

# Commande pour démarrer Apache une fois le conteneur lancé
CMD ["httpd-foreground"]
