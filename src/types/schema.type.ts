export type SchemaProperty = {
	type: string;
	format?: string;
	minLength?: number;
	enum?: string[];
	default?: string;
	description?: string;
	example?: string | number;
	examples?: (string | number | object)[];
	properties?: { [key: string]: SchemaProperty }; // ✅ Permet l'imbrication des objets
};

export type Schema = {
	type: string;
	required?: string[];
	properties: { [key: string]: SchemaProperty }; // ✅ Corrige l'erreur des objets imbriqués
	examples?: (string | number | object)[];
};
