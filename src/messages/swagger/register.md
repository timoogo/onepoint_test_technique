## Inscription de l'utilisateur

Cette route permet à un utilisateur de s'inscrire à l'application.

## Paramètres

- `email`: L'email de l'utilisateur.
- `password`: Le mot de passe de l'utilisateur.
- `name`: Le nom de l'utilisateur.
- `role`: Le rôle de l'utilisateur.


## Exemples de requête

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
<summary>Requête valide pour un utilisateur avec le rôle ADMIN (exemple2) </summary>

```json
{
  "name": "Utilisateur Test 540",
  "email": "utilisateur540@example.com",
  "password": "Qk8!EwIz",
  "role": "admin"
}
```
</details>