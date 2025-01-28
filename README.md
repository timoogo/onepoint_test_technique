## Nommenclature des fichiers
- Controllers : `${name}.controller.ts`
- Services : `${name}.service.ts`
- Routes : `${name}.route.ts`



## Auth
Se rendre sur : `http://localhost:3000/docs` pour voir la documentation de l'API
Déplier la section `Auth` pour voir les routes disponibles
Cliquez sur `Try it out` pour tester les routes

remplir avec les informations suivantes :

```jsonb
{
  "email": "tiimogo@gmail.com",
    "password": "123456"
} 
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRpaW1vZ29AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM4MDIxMTk1LCJleHAiOjE3MzgxMDc1OTV9.aBKE21qylUrI_Nurj4PMTMnYLz0XJyqZ41bhrZh6IBo
```


```JSONb
// POST /users/users a changer
  {
    "name": "string",
    "email": "timothee.gaultier.pro@gmail.com",
    "password": "UneStringComplicat3d!",
    "role": "admin"
  }
```