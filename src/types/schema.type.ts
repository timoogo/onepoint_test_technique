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
      };
    };
  };
  