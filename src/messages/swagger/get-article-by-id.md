## Récupérer un article par son ID

### Description

Cette route permet de récupérer un article spécifique en utilisant son identifiant unique.

### Paramètres

- `id`: L'identifiant unique de l'article à récupérer.

## Exemple de requête

```json
{
    "id": 1
}
```

## Exemple de réponse

<details>
<summary>Exemple de réponse réussie</summary>
```json
{
  "status": "success",
  "message": {
    "state": "Resources found.",
    "details": "Article with ID 1 fetched successfully"
  },
  "data": {
    "id": 1,
    "title": "Article 1",
    "description": "Description 1",
    "content": "Content 1",
    "createdAt": "2025-02-23T11:27:06.821Z",
    "updatedAt": "2025-02-23T11:27:06.821Z",
    "createdById": 1,
    "createdBy": {
      "id": 1,
      "name": "Admin",
      "email": "admin@example.com"
    }
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

