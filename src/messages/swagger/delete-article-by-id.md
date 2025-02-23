[^1] `$TOKEN` fait référence au token de l'utilisateur authentifié. Il est obligatoire pour effectuer cette requête.

## Supprimer un article par son ID


### Description

Cette route permet de supprimer un article spécifique en utilisant son identifiant unique.

### Paramètres

- `id`: L'identifiant unique de l'article à supprimer.

## Exemple de requête

```json
{
    "id": 1,
}
```

```bash
curl -X DELETE http://localhost:3000/articles/1 -H "Authorization: Bearer $TOKEN"
```

## Exemple de réponse

<details>
<summary>Exemple de réponse réussie</summary>

```json
{
  "status": "success",
  "message": "User with ID 2 deleted successfully.",
  "data": {
    "id": 2,
    "name": "User",
    "email": "user@example.com",
    "role": "user",
    "createdAt": "2025-02-23T14:36:19.811Z",
    "updatedAt": "2025-02-23T14:42:02.330Z"
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

