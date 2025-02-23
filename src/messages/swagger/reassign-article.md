## Réassigner un article à un autre utilisateur

### Description

Cette route permet de réassigner un article à un autre utilisateur. Cette route est accessible uniquement aux utilisateurs authentifiés et admin.

Il est nécéssaire de passer le token d'authentification dans l'en-tête de la requête.

Pour rappel, le token est généré lors de l'authentification. 

`$TOKEN`[^1] correspond à la valeur du token d'authentification.

### Paramètres

- `oldUserId`: L'identifiant unique de l'utilisateur qui possède l'article.
- `newUserId`: L'identifiant unique de l'utilisateur qui recevra l'article.

#### Optionels

- `page`: Pagination. Par défaut, la page est 1.
- `limit`: Nombre d'articles par page. Par défaut, la limite est 10.

Ces paramètres sont optionnels et permettent de paginer les articles réassignés. Ils sont configurables, et par défaut, ces paramètres sont gérés par `ArticleConfig.pagination.limit` et `ArticleConfig.pagination.page`.

## Exemple de requête

```json
{
    "oldUserId": 1,
    "newUserId": 2
}
```
## Exemple de requête avec pagination

> [^1] `$TOKEN` correspond à la valeur du token d'authentification.
```json
{
    "oldUserId": 1,
    "newUserId": 2,
    "page": 1,
    "limit": 10
}
ou avec curl
```bash
curl -X 'PUT' \
  'http://localhost:3000/articles/reassign' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
  "oldUserId": 1,
  "newUserId": 2,
  "page": 1,
  "limit": 10
}'
```

## Exemple de réponse

<details>
<summary>Exemple de réponse réussie</summary>
```json
{
  "status": "success",
  "message": "Articles reassigned successfully to user 2.",
  "count": 1,
  "total": 2,
  "articles": [
    {
      "id": 1,
      "title": "Article 1",
      "description": "Description 1",
      "content": "Content 1",
      "createdAt": "2025-02-23T13:40:55.133Z",
      "updatedAt": "2025-02-23T13:42:21.836Z"
    },
    {
      "id": 2,
      "title": "Article 2",
      "description": "Description 2",
      "content": "Content 2",
      "createdAt": "2025-02-23T13:40:55.133Z",
      "updatedAt": "2025-02-23T13:40:55.133Z"
    }
  ]
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

