import { ExampleGenerator } from "../utils/example.generator.utils";


export const ArticleDocRequestExamples = {
    GetAllArticles: [
        {
            summary: "Requête valide",
            value: {
                page: 1,
                limit: 10,
            },
        },
        {
            summary: "Requête invalide",
            value: {
                page: "première", 
                limit: -5, 
            },
        },
    ],
    CreateArticle: [
        {
            title: "Titre de l'article qui respecte les contraintes de longueur",
            description: "Description de l'article qui respecte les contraintes de longueur",
            content: "Contenu de l'article qui respecte les contraintes de longueur",
        },
        {
            title: "Invalid",
			description: "Invalid",
			content: "Invalid",
        },
    ],
	DeleteArticle: [
		{
			id: 1,
		},
	],

};


export const ArticleDocResponseExamples = {
	GetAllArticles: [
		{
			status: "success",
			message: {
				state: "Ressources trouvées",
				details: "Articles récupérée avec succès.",
			},
			total: 30,
			page: 1,
			limit: 10,
			data: ExampleGenerator.generateMultipleArticleExamples(3),
		},
	
		{
			status: "error",
			message:
				"Paramètres invalides : page doit être un entier positif, limit doit être un nombre supérieur à 0.",
		},
		{
			status: "error",
			message: "Internal server error",
		},
	],

	GetArticleById: [
		{
			status: "success",
			message: "Article récupéré avec succès.",
			data: [
				{
					"title": "Titre de l'article 649",
					"description": "Description de l'article 649",
					"content": "Contenu de l'article 649",
					"createdAt": "2025-02-23T11:17:42.859Z",
					"updatedAt": "2025-02-23T11:17:42.859Z"
				  },
				  {
					"title": "Titre de l'article 849",
					"description": "Description de l'article 849",
					"content": "Contenu de l'article 849",
					"createdAt": "2025-02-23T11:17:42.859Z",
					"updatedAt": "2025-02-23T11:17:42.859Z"
				  },
			]
		},
		{
			status: "error",
			message: "Article non trouvé.",
		},
		{
			status: "error",
			message: "Internal server error",
		},
	],
	DeleteArticle: [
		{
			status: "success",
			message: "Article supprimé avec succès.",
		},
		
	],

	CreateArticle_Success: [
		{
			status: "success",
			message: "Article créé avec succès.",
		},
	],
	CreateArticle_Error: [
		{
			status: "error",
			message: "Paramètres invalides : title doit contenir entre 5 et 100 caractères.",
		},
	],
};
