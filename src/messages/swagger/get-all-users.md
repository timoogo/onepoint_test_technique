## Récupérer tous les utilisateurs (ADMIN)

Cette route permet de récupérer tous les utilisateurs.

## Paramètres

### Query Parameters (optionnels)
Par défaut, la route renvoie le nombre d'utilisateurs par page défini dans la configuration.

On peut cependant modifier ce comportement en ajoutant les paramètres suivants :

- `page`: Le numéro de la page à récupérer. (Optionnel, valeur par défaut : 1, configuration : `UserConfig.PaginationConfig.DEFAULT_PAGE`)
- `limit`: Le nombre d'utilisateurs par page. (Optionnel, valeur par défaut : 10, configuration : `UserConfig.PaginationConfig.DEFAULT_LIMIT`)

## Exemple de requête

<details>
<summary>Requête valide pour récupérer tous les utilisateurs (exemple1) </summary>

```json
{
    "page": 1,
    "limit": 9999
}
```
</details>

## Informations supplémentaires
| Paramètre | Type | Description | Contraintes |
|-----------|------|-------------|------------|
| `page` | number | Le numéro de la page à récupérer | Optionnel, valeur par défaut : 1 |
| `limit` | number | Le nombre d'utilisateurs par page | Optionnel, valeur par défaut : 10 |

