# Étape 1 : Base Node.js
FROM node:19-alpine

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Installer les dépendances système
RUN apk add --no-cache postgresql-client

# Étape 4 : Copier les fichiers nécessaires avant l'installation
COPY package*.json ./
COPY tsconfig.json ./

# Étape 5 : Installer les dépendances en mode production
RUN npm install --only=production
RUN npm install @types/bcrypt

# Étape 6 : Copier le code source
COPY ./src ./src
COPY ./prisma ./prisma
COPY ./prisma/seed.ts ./prisma/seed.ts

# Étape 7 : Générer le client Prisma AVANT la compilation TypeScript
RUN npx prisma generate

# Étape 8 : Compiler TypeScript
RUN npm run build

# Étape 9 : Copier les fichiers pour l'exécution en prod
COPY entrypoint.prod.sh ./
RUN chmod +x ./entrypoint.prod.sh
COPY ./.env.prod ./.env

# Étape 10 : Définition du point d'entrée
ENTRYPOINT ["./entrypoint.prod.sh"]