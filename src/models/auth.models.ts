import { Schema } from "../utils/schema.type";

export const loginModel: Schema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { 
        type: 'string', 
        format: 'email', 
        description: "L'adresse email de l'utilisateur pour la connexion"
      },
      password: { 
        type: 'string', 
        minLength: 6, 
        description: "Mot de passe de l'utilisateur pour la connexion"
      }
    },
  };
  
  export const loginResponseModel: Schema = {
    type: 'object',
    required: ['token'],
    properties: {
      token: { 
        type: 'string', 
        description: "Token JWT à utiliser pour les requêtes authentifiées"
      }
    }
  };