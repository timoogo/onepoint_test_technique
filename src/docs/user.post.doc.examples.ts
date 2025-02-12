import { ExampleGenerator } from "../utils/example.generator.utils";

export const UserDocRequestExamples = [
	ExampleGenerator.generateUserExample("USER"),
	ExampleGenerator.generateUserExample("ADMIN"),
];

export const UserDocResponseExamples = [
	{
		status: {
			code: 201,
			message: "Ressource créée avec succès.",
		},
		data: {
			id: 59,
			name: "utilisaaateur792@example.com",
			email: "Utilisateur Test 792",
			role: "USER",
		},
	},
	{
		status: {
			code: 201,
			message: "Ressource créée avec succès.",
		},
		data: {
			id: 59,
			name: "utilisaaateur792@example.com",
			email: "Utilisateur Test 792",
			role: "ADMIN",
		},
	},
];
