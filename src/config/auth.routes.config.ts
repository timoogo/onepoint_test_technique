import { loginModel, loginResponseModel } from "../models/auth.models";
import { HttpMessages, HttpStatus } from "./http.config";

export const LoginRouteDefinition = {
    schema: {
        consumes: ["application/json"],
        produces: ["application/json"],
        description: `
          Cette route permet à un utilisateur de se connecter en fournissant un email et un mot de passe valides.  
          En cas de succès, un token JWT est retourné pour permettre l'authentification aux routes protégées.  

          🔹 **Exigences** :
          - L'email doit être une adresse valide.
          - Le mot de passe doit correspondre à celui enregistré en base de données.

          🔹 **Scénarios de réponse** :
          - ✅ \`${HttpStatus.OK} OK\` : Connexion réussie, token JWT retourné.
          - ❌ \`${HttpStatus.BAD_REQUEST} BAD_REQUEST\` : Erreur de validation des champs.
          - ❌ \`${HttpStatus.UNAUTHORIZED} UNAUTHORIZED\` : Échec de l'authentification (mauvais identifiants).
          - ❌ \`${HttpStatus.INTERNAL_SERVER_ERROR} INTERNAL_SERVER_ERROR\` : Erreur inattendue côté serveur.

          🔹 **Exemple de requête** :
          \`\`\`json
          {
            "email": "johndoe@example.com",
            "password": "MotDePasseSecurisé123!"
          }
          \`\`\`

          🔹 **Exemple de réponse en cas de succès (\`${HttpStatus.OK} OK\`)** :
          \`\`\`json
          {
            "status": "success",
            "message": "Connexion réussie.",
            "token": "eyJhbGciOiJIUzI1NiIsIn..."
          }
          \`\`\`

          🔹 **Exemple de réponse en cas d'erreur (\`${HttpStatus.UNAUTHORIZED} UNAUTHORIZED\`)** :
          \`\`\`json
          {
            "status": "error",
            "errorCode": 401,
            "message": "Email ou mot de passe incorrect."
          }
          \`\`\`
        `,
        tags: ["Auth"],
        body: loginModel,
        response: {
            200: loginResponseModel,
            400: {
                type: "object",
                properties: {
                    message: { type: "string", description: "Erreur de validation des champs." },
                },
            },
            401: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        description: "Message d'erreur en cas d'identifiants incorrects",
                    },
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
