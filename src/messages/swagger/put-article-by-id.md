[^1] `$TOKEN` fait référence au token de l'utilisateur authentifié. Il est obligatoire pour effectuer cette requête.

## Modifier un article par son ID


### Description

Cette route permet de modifier un article spécifique en utilisant son identifiant unique.
Doit être utilisé pour modifier un article existant.
Doit respecter les règles de validation des données : 

(Ces règles sont définies dans le schéma de validation des données, voici les règles par défaut : )

- `title` : 3 à 100 caractères
- `description` : 10 à 255 caractères
- `content` : 10 à 10000 caractères

Elles peuvent être modifiées dans le fichier `config/article.config.ts`

### Paramètres

- `id`: L'identifiant unique de l'article à supprimer.

## Exemple de requête

```json
{
    "id": 1,
    "title": "Nouveau titre",
    "description": "Nouvelle description",
    "content": "Nouveau contenu"
}
```

```bash
curl -X PUT http://localhost:3000/articles/1 -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"title": "Nouveau titre", "description": "Nouvelle description", "content": "Nouveau contenu"}'
```

## Exemple de réponse

<details>
<summary>Exemple de réponse réussie</summary>

```json
{
  "status": "success",
  "message": "Article with ID 1 updated successfully.",
  "data": {
    "id": 1,
    "title": "Nouveau titre",
    "description": "Nouvelle description",
    "content": "Nouveau contenu",
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

