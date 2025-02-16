export type SchemaProperty = {
	type: string;
	format?: string;
	minLength?: number;
	enum?: string[];
	default?: string;
	description?: string;
	example?: string | number;
	examples?: (string | number | object)[];
	properties?: { [key: string]: SchemaProperty }; 
};

export type Schema = {
	type: string;
	required?: string[];
	properties: { [key: string]: SchemaProperty }; 
	examples?: (string | number | object)[];
};
