import { HttpStatus } from "../config/http.config";
import { AuthDocExamples } from "../docs/auth.doc.examples";
import { Tags } from "../config/app.config";
export const AuthSchemas = {
    Login: {
        tags: [Tags.AUTH],
        description: "Connexion de l'utilisateur",
        body: {
            type: "object",
            required: ["email", "password"],
            properties: {
                email: { type: "string", format: "email", description: "Email de l'utilisateur" },
                password: { type: "string", minLength: 8, description: "Mot de passe" },
            },
            examples: AuthDocExamples.Login,
        },
        response: {
            [HttpStatus.OK]: {
                type: "object",
                properties: {
                    status: { type: "string" },
                    message: { type: "string" },
                    token: { type: "string", description: "Token JWT" },
                },
            },
        },
    },
    Logout: {
        tags: [Tags.AUTH, Tags.USERS],
        description: "Déconnexion de l'utilisateur",
        response: {
            [HttpStatus.OK]: {
                type: "object",
                properties: {
                    message: { type: "string", description: "Message de succès" },
                },
            },
            [HttpStatus.INTERNAL_SERVER_ERROR]: {
                type: "object",
                properties: {
                    error: { type: "string", description: "Message d'erreur" },
                },
            },
        },
    },
};
