export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}

export const DocExample = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    password: "passwordComplic4ted!",
    role: UserRoles.USER,
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "SuperSecureP@ss123",
    role: UserRoles.ADMIN,
  },
];


export class UserConfig {
  static readonly UserRolesArray = Object.values(UserRoles);

  static readonly ID = {
    REQUIRED_MESSAGE: "L'id est obligatoire.",
    TYPE_MESSAGE: "L'id doit être un nombre.",
    POSITIVE_MESSAGE: "L'id doit être un nombre positif.",
  };

  static readonly NAME_LENGTH = { MIN: 2, MAX: 50 };

  static readonly NAME = {
    REQUIRED_MESSAGE: "Le nom est obligatoire.",
    TYPE_MESSAGE: "Le nom doit être une chaîne de caractères.",
    get LENGTH_MESSAGE() {
      return `Le nom doit contenir entre ${UserConfig.NAME_LENGTH.MIN} et ${UserConfig.NAME_LENGTH.MAX} caractères.`;
    },
  };

  static readonly EMAIL = {
    REQUIRED_MESSAGE: "L'email est obligatoire.",
    INVALID_MESSAGE: "L'email doit être valide.",
  };

  static readonly PASSWORD_LENGTH = { MIN: 8, MAX: 128 };

  static readonly PASSWORD = {
    REQUIRED_MESSAGE: "Le mot de passe est obligatoire.",
    TYPE_MESSAGE: "Le mot de passe doit être une chaîne de caractères.",
    get LENGTH_MESSAGE() {
      return `Le mot de passe doit contenir entre ${UserConfig.PASSWORD_LENGTH.MIN} et ${UserConfig.PASSWORD_LENGTH.MAX} caractères.`;
    },
    PATTERN_MESSAGE:
      "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.",
    REGEX: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
  };

  static readonly ROLE = {
    TYPE_MESSAGE: "Le rôle doit être une chaîne de caractères.",
    DEFAULT: UserRoles.USER,
    get PATTERN() {
      return new RegExp(`^(${UserConfig.UserRolesArray.join("|")})$`);
    },
    get PATTERN_MESSAGE() {
      return `Le rôle doit être "${UserConfig.UserRolesArray.join('" ou "')}".`;
    },
  };

}
