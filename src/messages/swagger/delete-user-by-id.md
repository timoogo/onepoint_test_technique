[^1] `$TOKEN` fait référence au token de l'utilisateur authentifié. Il est obligatoire pour effectuer cette requête.

## Supprimer un utilisateur par son ID

### Description

Cette route permet de supprimer un utilisateur spécifique en utilisant son identifiant unique.

### Paramètres

- `id` : L'identifiant unique de l'utilisateur à supprimer.

## Exemple de requête

```json
{
    "id": 2
}
```
ou

```bash
curl -X DELETE "http://localhost:3000/users/2" -H "Authorization: Bearer $TOKEN"
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
<summary>Exemple de réponse si l'utilisateur n'existe pas</summary>

```json
{
  "status": "error",
  "message": "User non trouvé."
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

- **404 Not Found** : L'utilisateur spécifié n'existe pas.
- **500 Internal Server Error** : Une erreur interne du serveur est survenue.