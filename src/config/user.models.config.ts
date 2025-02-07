import { UserRoles } from "../config/user.config";

export type Schema = {
  type: string;
  required: string[];
  properties: {
    [key: string]: {
      type: string;
      format?: string;
      minLength?: number;
      enum?: string[];
      default?: string;
      description?: string;
      example?: string | number;
    };
  };
};

export const userModel: Schema = {
  type: "object",
  required: ["email", "name", "password"],
  properties: {
    email: {
      type: "string",
      format: "email",
      description: "L'adresse email de l'utilisateur (doit être unique)",
      example: "johndoe@example.com",
    },
    name: {
      type: "string",
      minLength: 3,
      description: "Nom de l'utilisateur (minimum 3 caractères)",
      example: "John Doe",
    },
    password: {
      type: "string",
      minLength: 6,
      description: "Mot de passe (minimum 6 caractères, haché en base)",
      example: "MotDePasseSecurisé123!",
    },
    role: {
      type: "string",
      enum: Object.values(UserRoles), // Utilisation des rôles définis en config
      default: UserRoles.USER, // Valeur par défaut
      description: "Rôle de l'utilisateur",
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
};
