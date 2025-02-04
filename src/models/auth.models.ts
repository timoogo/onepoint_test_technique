import { Schema } from "../types/schema.type";

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

  export const registerModel: Schema = {
    type: 'object',
    required: ['email', 'name', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: "L'adresse email de l'utilisateur (doit être unique)"
      },
      name: {
        type: 'string',
        minLength: 3,
        description: "Nom de l'utilisateur (minimum 3 caractères)"
      },
      password: {
        type: 'string',
        minLength: 6,
        description: "Mot de passe (minimum 6 caractères, haché en base)"
      }
    },
  };

  export const registeredUserModel: Schema = {
    type: 'object',
    required: ['id', 'email', 'name', 'role', 'createdAt', 'updatedAt'],
    properties: {
      id: {
        type: 'number',
        description: "Identifiant unique de l'utilisateur"
      },
      email: {
        type: 'string',
        format: 'email',
        description: "L'adresse email de l'utilisateur"
      },
      name: {
        type: 'string',
        minLength: 3,
        description: "Nom de l'utilisateur"
      },
      role: {
        type: 'string',
        enum: ['user', 'admin'],
        description: "Rôle de l'utilisateur (user ou admin)"
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        description: "Date de création de l'utilisateur"
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        description: "Date de dernière mise à jour de l'utilisateur"
      },
    },  
  }
