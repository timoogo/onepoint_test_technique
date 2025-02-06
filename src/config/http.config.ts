export const HttpStatus = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  } as const;
  
  export const HttpMessages = {
    SUCCESS: "Requête réussie.",
    CREATED: "Ressource créée avec succès.",
    BAD_REQUEST: "Requête invalide.",
    UNAUTHORIZED: "Accès non autorisé.",
    FORBIDDEN: "Accès interdit.",
    NOT_FOUND: "Ressource non trouvée.",
    INTERNAL_SERVER_ERROR: "Erreur interne du serveur.",
    TOKEN_INVALID: "Token invalide ou expiré.",
    TOKEN_MISSING: "Token manquant",
    TOKEN_BLACKLISTED: "Token révoqué",
    NO_RESOURCES_FOUND: "Aucune ressource trouvée.",
  };

  
  