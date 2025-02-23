## Récupérer tous les articles

### Description

Cette route permet de récupérer tous les articles disponibles dans la base de données.

### Paramètres

- `page`: Numéro de la page à récupérer. (Optionnel, par défaut : 1, Configurable dans le fichier de configuration)
- `limit`: Nombre d'articles par page. (Optionnel, par défaut : 10, Configurable dans le fichier de configuration)

### Exemples

<details>
<summary>Requête valide</summary>

```json

```
</details>

<details>
<summary>Requête invalide</summary>

La requête suivante sera rejetée car la valeur de `page` est une chaîne de caractères et la valeur de `limit` est négative.
```json

{
  "page": "première",
  "limit": -5
}
```
</details>
