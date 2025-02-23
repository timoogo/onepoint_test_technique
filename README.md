# README - Installation du Projet Test Technique OnePoint

## 1. Prérequis

- **Node.js** (version recommandée : 18+)
- **npm** (version recommandée : 9+)
- **PostgreSQL** (ou autre SGBD compatible avec Prisma)

> Lorsque la mention de `${PORT}` est faite, il s'agit du port sur lequel le serveur sera accessible.
> Par défaut, il est de 3000. Il est possible de le modifier dans le fichier `.env`.

---

## 2. Installation des Dépendances

```bash
npm install
```

---

## 3. Configuration de l'Environnement

- Dupliquez le fichier `.env.example` en `.env`

```bash
cp .env.example .env
```

- Renseignez les valeurs nécessaires (base de données, clés JWT, etc.)

---

## 4. Initialisation du Projet

### Générer le client Prisma :

```bash
npx prisma generate
```

### Créer la base de données (avec migrations) :

```bash
npx prisma migrate dev --name init
```

---

## 5. Lancer le Projet

```bash
npm run dev
```

- Le serveur sera accessible sur : `http://localhost:${PORT}`

---

## 6. Accéder à la Documentation de l'API

- Swagger disponible à : `http://localhost:${PORT}/docs`

---

## 7. Scripts utiles

| Commande                    | Description                                                 |
| --------------------------- | ----------------------------------------------------------- |
| `npm run dev`               | Lancer l'application en mode dev                            |
| `npm run build`             | Compiler l'application                                      |
| `npm run start`             | Lancer l'application en production                          |
| `npm run lint`              | Vérifier les erreurs ESLint                                 |
| `npm run format`            | Formater le code avec Prettier                              |
| `npm run docker:up:dev`     | Lancer l'application en mode dev avec Docker                |
| `npm run docker:up:prod`    | Lancer l'application en production avec Docker              |
| `npm run docker:down:dev`   | Arrêter l'application en mode dev avec Docker               |
| `npm run docker:down:prod`  | Arrêter l'application en production avec Docker             |
| `npm run docker:down`       | Arrêter l'application en mode dev et production avec Docker |
| `npm run docker:build:dev`  | Compiler l'application en mode dev avec Docker              |
| `npm run docker:build:prod` | Compiler l'application en production avec Docker            |

---

## 8. Remarques

- En cas de problème avec Prisma, exécuter :

```bash
npx prisma generate
```
