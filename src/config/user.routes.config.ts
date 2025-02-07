import { registerModel, registerResponseModel } from "../models/auth.models";
import { HttpMessages, HttpStatus } from "./http.config";

export const RegisterRouteDefinition = {
    schema: {
        consumes: ["application/json"],
        produces: ["application/json"],
        description: `
          Cette route permet à un nouvel utilisateur de s'inscrire.  
          Une fois inscrit, il pourra se connecter et accéder aux fonctionnalités protégées.  

          🔹 **Exigences** :
          - Le **nom** doit contenir entre 2 et 50 caractères.
          - L'**email** doit être une adresse valide et unique.
          - Le **mot de passe** doit respecter les règles de sécurité :
            - Une **majuscule**.
            - Une **minuscule**.
            - Un **chiffre**.
            - Un **caractère spécial** (\`!@#$%^&*\`).

          🔹 **Scénarios de réponse** :
          - ✅ \`${HttpStatus.CREATED} CREATED\` : Inscription réussie.
          - ❌ \`${HttpStatus.BAD_REQUEST} BAD_REQUEST\` : Erreur de validation des champs.
          - ❌ \`${HttpStatus.INTERNAL_SERVER_ERROR} INTERNAL_SERVER_ERROR\` : Erreur serveur.

          🔹 **Exemple de requête** :
          \`\`\`json
          {
            "name": "John Doe",
            "email": "johndoe@example.com",
            "password": "MotDePasseSecurisé123!"
          }
          \`\`\`

          🔹 **Exemple de réponse en cas de succès (\`${HttpStatus.CREATED} CREATED\`)** :
          \`\`\`json
          {
            "status": "success",
            "message": "Utilisateur créé avec succès.",
            "user": {
              "id": 1,
              "name": "John Doe",
              "email": "johndoe@example.com"
            }
          }
          \`\`\`

          🔹 **Exemple de réponse en cas d'erreur (\`${HttpStatus.BAD_REQUEST} BAD_REQUEST\`)** :
          \`\`\`json
          {
            "status": "error",
            "errorCode": 400,
            "message": "L'email est déjà utilisé."
          }
          \`\`\`
        `,
        tags: ["Auth"],
        body: registerModel,
        response: {
            201: registerResponseModel,
            400: {
                type: "object",
                properties: {
                    message: { type: "string", description: "Erreur de validation des champs." },
                },
            },
            500: {
                type: "object",
                properties: {
                    message: { type: "string", description: HttpMessages.INTERNAL_SERVER_ERROR },
                },
            },
        },
    },
};
