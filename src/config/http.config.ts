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
    SUCCESS: "Request successful.",
    CREATED: "Resource created successfully.",
    BAD_REQUEST: "Invalid request.",
    UNAUTHORIZED: "Unauthorized access.",
    FORBIDDEN: "Access denied.",
    NOT_FOUND: "Resource not found.",
    INTERNAL_SERVER_ERROR: "Internal server error.",
    TOKEN_INVALID: "Invalid or expired token.",
    TOKEN_MISSING: "Token missing",
    TOKEN_BLACKLISTED: "Token revoked",
    NO_RESOURCES_FOUND: "No resources found.",
    RESOURCE_NOT_FOUND: "Resource not found.",
    RESOURCES_NOT_FOUND: "Resources not found.",
    RESOURCES_FOUND: "Resources found.",
  };

  
  