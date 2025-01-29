import { Schema } from "../types/schema.type";

export const userModel: Schema = {
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
    },
    role: {
      type: 'string',
      enum: ['user', 'admin'],
      default: 'user',
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
};
