## Connexion de l'utilisateur

Cette route permet à un utilisateur de se connecter à l'application.

## Paramètres

- `email`: L'email de l'utilisateur.
- `password`: Le mot de passe de l'utilisateur.


## Exemples de requête

<details>
<summary>Requête valide pour un utilisateur avec le rôle ADMIN (exemple1) </summary>

```json
{
    "email": "admin@example.com",
    "password": "SuperSecureP@ss123"
}
```
</details>

<details>
<summary>Requête valide pour un utilisateur avec le rôle USER (exemple2) </summary>

```json
{
    "email": "user@example.com",
    "password": "MotDePasseSecurisé123!"
}
```
</details>