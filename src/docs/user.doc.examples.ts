import { ExampleGenerator } from "../utils/example.generator.utils";

export const UserDocRequestExamplesX = [
	ExampleGenerator.generateUserExample("USER"),
	ExampleGenerator.generateUserExample("ADMIN"),
];

export const UserGetAllDocRequestExamples = [
	{
		page: 1,
		limit: 9999,
	},
];

export const UserGetAllDocResponseExamples = [
	{
		status: {
			code: 200,
			message: "Ressources récupérées avec succès.",
		},
		data: {
			id: 59,
			name: "utilisaaateur792@example.com",
			email: "Utilisateur Test 792",
			role: "USER"
		}
	},
	{
		 
			status: "error",
			errorCode: 401,
			message: "Token missing"
		
	},
	{
		status: "success",
		message: {
			state: "No resources found.",
			details: "No users found"
		},
		total: 0,
		page: 1,
		limit: 10,
		data: []
	  }
];

export const UserPostDocResponseExamples = [
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



export const UserDeleteDocRequestExamples = {
	DeleteSuccess: [
		{
			summary: "Suppression réussie",
			value: { id: 2 },
		},
	],
	DeleteNotFound: [
		{
			summary: "Utilisateur inexistant",
			value: { id: 99 },
		},
	],
};
export const UserDeleteDocResponseExamples = {
	Success: [
		{
			summary: "Exemple de suppression réussie",
			value: {
				status: "success",
				message: {
					state: "User deleted",
					details: "User with ID 2 deleted successfully.",
				},
				data: {
					id: 2,
					name: "John Doe",
					email: "johndoe@example.com",
					role: "user",
					createdAt: "2025-02-12T14:51:31.213Z",
					updatedAt: "2025-02-12T14:51:31.213Z",
				},
			},
		},
	],
	NotFound: [
		{
			summary: "Utilisateur non trouvé",
			value: {
				status: "error",
				message: {
					state: "User not found",
					details: "No user found with ID 99.",
				},
			},
		},
	],
	InternalError: [
		{
			summary: "Erreur serveur",
			value: {
				status: "error",
				message: {
					state: "Internal server error",
					details: "An unexpected error occurred while deleting the user.",
				},
			},
		},
	],
};
