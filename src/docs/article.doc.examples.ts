import { ExampleGenerator } from "../utils/example.generator.utils";

//  export const ArticleDocExamples = {
//  	Article: [
//  		ExampleGenerator.generateArticleExample(),
//  		ExampleGenerator.generateArticleExample(),
//  	],
//     GetAllArticles: [
//         ExampleGenerator.generateMultipleArticleExamples(3),
//     ],
//  	Reassign: [
//  		{ oldUserId: 12, newUserId: 34 },
//  		{ oldUserId: null, newUserId: 56 },
//  	],
//     Delete: [
//         { id: 12 },
//     ]

//  };

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
                page: "première", // ❌ Mauvais type (string au lieu d'un nombre)
                limit: -5, // ❌ Valeur négative invalide
            },
        },
    ],
    CreateArticle: [
        {
            summary: "Requête valide",
            value: {
                title: "Titre de l'article",
				description: "Description de l'article",
				content: "Contenu de l'article",
            },
        },
        {
            summary: "Requête invalide",
            value: {
                title: "Titre de l'article",
            },
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
