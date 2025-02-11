## Nommenclature des fichiers

- Controllers : `${name}.controller.ts`
- Services : `${name}.service.ts`
- Routes : `${name}.route.ts`

## Auth

Se rendre sur : `http://localhost:3000/docs` pour voir la documentation de l'API
Déplier la section `Auth` pour voir les routes disponibles
Cliquez sur `Try it out` pour tester les routes

remplir avec les informations suivantes :

```JSONb
// POST
{"email": "t@t.com", "password": "UneStringComplicat3d!"}
```

## Routes

### Routes liées aux articles (/articles)

- [x] GET /articles → Récupérer la liste des articles (Public, aucun rôle requis)
- [x] GET /articles/:id → Récupérer un article par ID (Public, aucun rôle requis)
- [x] POST /articles → Créer un nouvel article (Authentification requise, rôle Admin)
- [x] PUT /articles/:id → Modifier un article (Authentification requise, rôle Admin)
- [x] DELETE /articles/:id → Supprimer un article (Authentification requise, rôle Admin)

### Routes liées aux utilisateurs (/users)

- [x] GET /users → Récupérer la liste des utilisateurs (Authentification requise, rôle Admin)
- [x] GET /users/:id → Récupérer un utilisateur par ID (Authentification requise, rôle Admin)
- [x] POST /users/register → Créer un compte utilisateur (Public, aucun rôle requis)
- [x] POST /users/login → Se connecter et obtenir un token JWT (Public, aucun rôle requis)
- [x] DELETE /users/:id → Supprimer un utilisateur (Authentification requise, rôle Admin)

### Routes d’authentification (/auth)

- [x] POST /auth/login → Connexion et récupération du token JWT (Public, aucun rôle requis)
  - [x] Documentation faite
  - [x] Exemple de requête faite
- [x] POST /auth/logout → Déconnexion (Authentification requise, aucun rôle requis)

D'accord, voici une version avec un suivi détaillé par route pour la **documentation** et les **tests techniques**.

---

# 📌 **Suivi de la Documentation & des Tests Techniques**

## 📝 **Articles (`/articles`)**

| Méthode | Endpoint        | Documentation | Tests techniques |
| ------- | --------------- | ------------- | ---------------- |
| GET     | `/articles`     | ❌ À faire    | ❌ À faire       |
| GET     | `/articles/:id` | ❌ À faire    | ❌ À faire       |
| POST    | `/articles`     | ❌ À faire    | ❌ À faire       |
| PUT     | `/articles/:id` | ❌ À faire    | ❌ À faire       |
| DELETE  | `/articles/:id` | ❌ À faire    | ❌ À faire       |

---

## 👤 **Utilisateurs (`/users`)**

| Méthode | Endpoint          | Documentation | Tests techniques |
| ------- | ----------------- | ------------- | ---------------- |
| GET     | `/users`          | ❌ À faire    | ❌ À faire       |
| GET     | `/users/:id`      | ❌ À faire    | ❌ À faire       |
| POST    | `/users/register` | ❌ À faire    | ❌ À faire       |
| POST    | `/users/login`    | ❌ À faire    | ❌ À faire       |
| DELETE  | `/users/:id`      | ❌ À faire    | ❌ À faire       |

---

## 🔑 **Authentification (`/auth`)**

| Méthode | Endpoint       | Documentation | Tests techniques |
| ------- | -------------- | ------------- | ---------------- |
| POST    | `/auth/login`  | ✅ Fait       | ❌ À faire       |
| POST    | `/auth/logout` | ❌ À faire    | ❌ À faire       |

---

## 📋 **Tâches restantes**

- **Service Prisma**
  - [ ] Eviter d'instancier prisma dans les services a chaque fois
  - [ ] Utiliser un seul service pour les opérations de base de données
- **Documentation à compléter :**

  - [ ] **Articles** :
    - [x] [ArticleController](src/controllers/article.controller.ts)
    - [x] [ArticleService](src/services/article.service.ts)
    - [x] [ArticleRoutes](src/routes/article.routes.ts)
      - [x] [Get](src/routes/article.get.routes.ts)
         - [ ] Mettre le schéma dans [ArticleConfig](src/config/article.config.ts)
      - [x] [Post](src/routes/article.post.routes.ts)
      - [x] [Put](src/routes/article.put.routes.ts)
      - [x] [Delete](src/routes/article.delete.routes.ts) 
          - [ ] Mettre le schéma dans [ArticleConfig](src/config/article.config.ts)
          - [ ] Utiliser HttpStatus et HttpMessages
  - [ ] **Utilisateurs** : Tout à faire
    - [x] [Controller](src/controllers/user.controller.ts)
    - [x] [Service](src/services/user.service.ts)
    - [x] [Route](src/routes/user.routes.ts)
      - [ ] [Get](src/routes/user.get.routes.ts)
      - [ ] [Post](src/routes/user.post.routes.ts)
      - [ ] Put (pas demandé, à voir si je le fais)
      - [ ] [Delete](src/routes/user.delete.routes.ts)
  - [ ] **Authentification** : `/auth/login` est fait, le reste est à faire
    - [x] [Controller](src/controllers/auth.controller.ts)
    - [x] [Service](src/services/auth.service.ts)
    - [x] [Route](src/routes/auth.routes.ts)

- **Tests techniques à faire :**
  - [ ] **Articles** : Tous les tests à écrire
  - [ ] **Utilisateurs** : Tous les tests à écrire
  - [ ] **Authentification** : Tous les tests à écrire

---




## Mode standard (sans redémarrage automatique)

Démarre le serveur sans respawn, idéal pour tester la fermeture propre (CTRL + C).

```bash
  npm run dev
```

✅ Capture et gestion propre des signaux (SIGINT, SIGTERM)
✅ Redis et Prisma sont fermés proprement à l'arrêt
✅ Le serveur ne redémarre pas après une fermeture manuelle (CTRL + C)

## Mode développement avec respawn

Démarre le serveur avec redémarrage automatique en cas de crash ou de modification de fichier.

```bash
  npm run dev:respawn
```

✅ Redémarrage automatique si un fichier TypeScript est modifié
✅ Gestion propre des signaux (SIGINT, SIGTERM)
✅ Redis et Prisma sont fermés proprement à l'arrêt






---

{
"name": "User",
"email": "t@t.com", "password": "UneStringComplicat3d!",
"role": "user"
}
