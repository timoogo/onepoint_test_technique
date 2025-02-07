import { UserRoles } from "../config/user.config";
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

  export const registerResponseModel: Schema = {
    type: "object",
    properties: {
      status: {
        type: "string",
        description: "Statut de la requête",
        example: "success",
      },
      message: {
        type: "string",
        description: "Message de confirmation d'inscription",
        example: "Utilisateur créé avec succès.",
      },
      user: {
        type: "object",
        properties: {
          id: {
            type: "number",
            description: "Identifiant unique de l'utilisateur",
            example: 1,
          },
          name: {
            type: "string",
            description: "Nom de l'utilisateur",
            example: "John Doe",
          },
          email: {
            type: "string",
            format: "email",
            description: "Adresse email de l'utilisateur",
            example: "johndoe@example.com",
          },
          role: {
            type: "string",
            enum: Object.values(UserRoles),
            description: "Rôle attribué à l'utilisateur",
            example: "user",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "Date de création de l'utilisateur",
            example: "2024-02-06T10:00:00Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "Date de dernière mise à jour de l'utilisateur",
            example: "2024-02-06T12:30:00Z",
          },
        },
      },
    },
  };
  