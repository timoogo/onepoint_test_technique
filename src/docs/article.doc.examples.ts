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
};


export const ArticleDocResponseExamples = {
	GetAllArticles: [
		{
			summary: "Succès",
			value: {
				status: "success",
				message: "Liste des articles récupérée avec succès.",
				count: 3,
				page: 1,
				limit: 10,
				total: 30,
				articles: ExampleGenerator.generateMultipleArticleExamples(3),
			},
		},
		{
			summary: "Erreur - Paramètres invalides",
			value: {
				status: "error",
				message:
					"Paramètres invalides : page doit être un entier positif, limit doit être un nombre supérieur à 0.",
			},
		},
	],
};
