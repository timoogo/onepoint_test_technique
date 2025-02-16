export type HumanizedRequest = {
    id: string;
    method: string;
    url: string;
    params?: Record<string, any>;
    query?: Record<string, any>;
    headers?: Record<string, string | string[] | undefined>;
    body?: any;
    user?: any; 
    cookies?: Record<string, any>; 
    connection?: Record<string, any>; 
  };
  