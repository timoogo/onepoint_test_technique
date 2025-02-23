## Récupérer un utilisateur par son ID

### Description

Cette route permet de récupérer un utilisateur spécifique en utilisant son identifiant unique.

### Paramètres

- `id`: L'identifiant unique de l'utilisateur à récupérer.

## Exemple de requête

```json
{
    "id": 1,
    pa
}
```

## Exemple de réponse

<details>
<summary>Exemple de réponse réussie</summary>
```json
{
  "status": "success",
  "message": "User with ID 1 fetched successfully.",
  "data": {
    "id": 1,
    "name": "Admin",
    "email": "admin@example.com",
    "role": "admin",
    "createdAt": "2025-02-23T14:00:36.464Z",
    "updatedAt": "2025-02-23T14:00:36.464Z"
  }
}
```
</details>

<details>
<summary>Exemple de réponse si l'article n'existe pas</summary>
```json
{
  "status": "error",
  "message": "Article non trouvé."
}
```
</details>

<details>
<summary>Exemple de réponse si une erreur interne du serveur est survenue</summary>
```json
{
  "status": "error",
  "message": "Internal server error"
}
```
</details>


## Erreurs possibles

- `404`: L'article spécifié n'existe pas.
- `500`: Une erreur interne du serveur est survenue.

