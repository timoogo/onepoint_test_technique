## ⚠️ Attention ⚠️
Cette route permet à un utilisateur *ADMIN* de créer un nouvel article.
Une fois créé, l'article pourra être *modifié* ou *supprimé* par un utilisateur *ADMIN*.

## Paramètres

- `title`: Le titre de l'article.
- `content`: Le contenu de l'article.
- `description`: La description de l'article.

## Exemple de requête


```json
{
    "title": "Mon article de test",
    "content": "Contenu de mon article de test",
    "description": "Description de mon article de test"
}

```


## Informations supplémentaires
| Paramètre | Type | Description | Contraintes |
|-----------|------|-------------|------------|
| `title` | string | Le titre de l'article | Obligatoire, longueur définie dans le fichier de configuration |
| `content` | string | Le contenu de l'article | Obligatoire, longueur définie dans le fichier de configuration |
| `description` | string | La description de l'article | Obligatoire, longueur définie dans le fichier de configuration |

