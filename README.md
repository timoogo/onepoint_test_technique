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

Routes liées aux articles (/articles)

- [x] GET /articles → Récupérer la liste des articles (Public, aucun rôle requis)
- [x] GET /articles/:id → Récupérer un article par ID (Public, aucun rôle requis)
- [x] POST /articles → Créer un nouvel article (Authentification requise, rôle Admin)
- [x] PUT /articles/:id → Modifier un article (Authentification requise, rôle Admin)
- [x] DELETE /articles/:id → Supprimer un article (Authentification requise, rôle Admin)

Routes liées aux utilisateurs (/users)

- [x] GET /users → Récupérer la liste des utilisateurs (Authentification requise, rôle Admin)
- [x] GET /users/:id → Récupérer un utilisateur par ID (Authentification requise, rôle Admin)
- [x] POST /users/register → Créer un compte utilisateur (Public, aucun rôle requis)
- [x] POST /users/login → Se connecter et obtenir un token JWT (Public, aucun rôle requis)
- [x] DELETE /users/:id → Supprimer un utilisateur (Authentification requise, rôle Admin)

Routes d’authentification (/auth)

- [x] POST /auth/login → Connexion et récupération du token JWT (Public, aucun rôle requis)
- [x] POST /auth/logout → Déconnexion (Authentification requise, aucun rôle requis)



---
{
  "name": "valentine",
  "email": "valentinedegaulle@gmail.com",
  "password": "Ell3Est!Mysandre",
  "role": "admin"
}


## TODO
- Faire :
  - les tests unitaires
  - les tests d'intégration
  - la documentation



