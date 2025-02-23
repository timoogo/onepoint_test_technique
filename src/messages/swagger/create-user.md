## ⚠️ Attention ⚠️
Cette route permet de créer un nouvel utilisateur.
il est possible de créer un utilisateur avec le rôle ADMIN ou USER.

## Paramètres

- `name`: Le nom de l'utilisateur.
- `email`: L'email de l'utilisateur.
- `password`: Le mot de passe de l'utilisateur.
- `role`: Le rôle de l'utilisateur.

## Exemples de requêtes

<details>
<summary>Requête valide pour un utilisateur avec le rôle ADMIN (exemple1) </summary>

```json
{
    "name": "Utilisateur Test 543",
    "email": "utilisateur543@example.com",
    "password": "Mi3^%!aa",
    "role": "user"
}
```

</details>

<details>
<summary>Requête valide pour un utilisateur avec le rôle USER (exemple2) </summary>

```json
{
    "name": "Utilisateur Test 540",
    "email": "utilisateur540@example.com",
    "password": "Qk8!EwIz",
    "role": "user"
}
```

</details>


## Informations supplémentaires
| Paramètre | Type | Description | Contraintes |
|-----------|------|-------------|------------|
| `name` | string | Le nom de l'utilisateur | Obligatoire, longueur définie dans le fichier de configuration |
| `email` | string | L'email de l'utilisateur | Obligatoire, longueur définie dans le fichier de configuration |
| `password` | string | Le mot de passe de l'utilisateur | Obligatoire, longueur définie dans le fichier de configuration |
| `role` | string | Le rôle de l'utilisateur | Obligatoire, longueur définie dans le fichier de configuration |

