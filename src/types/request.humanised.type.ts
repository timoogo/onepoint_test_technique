export type HumanizedRequest = {
    id: string;
    method: string;
    url: string;
    params?: Record<string, any>;
    query?: Record<string, any>;
    headers?: Record<string, string | string[] | undefined>;
    body?: any;
    user?: any; // Peut être affiné selon le schéma d'authentification
    cookies?: Record<string, any>; // Ajout des cookies si nécessaire
    connection?: Record<string, any>; // Ajout des informations de connexion si nécessaire
  };
  