export type SchemaProperty = {
  type: string;
  format?: string;
  minLength?: number;
  enum?: string[];
  default?: string;
  description?: string;
  example?: string | number;
  properties?: { [key: string]: SchemaProperty }; // ✅ Permet l'imbrication des objets
};

export type Schema = {
  type: string;
  required?: string[];
  properties: { [key: string]: SchemaProperty }; // ✅ Corrige l'erreur des objets imbriqués
};
