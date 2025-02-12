import { ArticleConfig } from "../config/article.config";
import { DocConfig } from "../config/doc.config";

export const ArticleMessages = {
	TITLE_REQUIRED: "Le titre est obligatoire",
	TITLE_LENGTH: `Le titre doit contenir entre ${ArticleConfig.TITLE_LENGTH.MIN} et ${ArticleConfig.TITLE_LENGTH.MAX} caractères`,

	DESCRIPTION_REQUIRED: "La description est obligatoire",
	DESCRIPTION_LENGTH: `La description doit contenir entre ${ArticleConfig.DESCRIPTION_LENGTH.MIN} et ${ArticleConfig.DESCRIPTION_LENGTH.MAX} caractères`,

	CONTENT_REQUIRED: "Le contenu est obligatoire",
	CONTENT_LENGTH: `Le contenu doit contenir entre ${ArticleConfig.CONTENT_LENGTH.MIN} et ${ArticleConfig.CONTENT_LENGTH.MAX} caractères`,
};
export const ArticleDisclaimerForReassign = `
    ${DocConfig.addTitleLevel(`${DocConfig.centerText(DocConfig.addBrTags("⚠️ Attention ⚠️"))}`, 2)}
    ${DocConfig.centerText(DocConfig.addBrTags("Assurez-vous que l'ID du nouvel utilisateur est correct."))}
    ${DocConfig.centerText(DocConfig.addBrTags("Ce sont des datas à fin d'exemples, merci de renseigner les IDs correctement."))}
`;
export const ArticleDisclaimerForDelete = `
    ${DocConfig.addTitleLevel(`${DocConfig.centerText(DocConfig.addBrTags("⚠️ Attention ⚠️"))}`, 2)}
    ${DocConfig.centerText(DocConfig.addBrTags("Assurez-vous que l'ID de l'utilisateur est correct."))}
    ${DocConfig.centerText(DocConfig.addBrTags("Ce sont des datas à fin d'exemples, merci de renseigner les IDs correctement."))}
`;
export const ArticleDisclaimerForUpdate = `
    ${DocConfig.addTitleLevel(`${DocConfig.centerText(DocConfig.addBrTags("⚠️ Attention ⚠️"))}`, 2)}
    ${DocConfig.centerText(DocConfig.addBrTags("Assurez-vous que l'ID de l'utilisateur est correct."))}
    ${DocConfig.centerText(DocConfig.addBrTags("Ce sont des datas à fin d'exemples, merci de renseigner les IDs correctement."))}
`;
export const ArticleDisclaimerForCreate = `
    ${DocConfig.addTitleLevel(`${DocConfig.centerText(DocConfig.addBrTags("⚠️ Attention ⚠️"))}`, 2)}
    ${DocConfig.centerText(DocConfig.addBrTags("Assurez-vous que l'ID de l'utilisateur est correct."))}
    ${DocConfig.centerText(DocConfig.addBrTags("Ce sont des datas à fin d'exemples, merci de renseigner les IDs correctement."))}
`;
export const ArticleDisclaimerForGetAll = `
    ${DocConfig.addTitleLevel(`${DocConfig.centerText(DocConfig.addBrTags("⚠️ Attention ⚠️"))}`, 2)}
    ${DocConfig.centerText(DocConfig.addBrTags("Assurez-vous que l'ID de l'utilisateur est correct."))}
    ${DocConfig.centerText(DocConfig.addBrTags("Ce sont des datas à fin d'exemples, merci de renseigner les IDs correctement."))}
`;
export const ArticleDisclaimerForGetById = `
    ${DocConfig.addTitleLevel(`${DocConfig.centerText(DocConfig.addBrTags("⚠️ Attention ⚠️"))}`, 2)}
    ${DocConfig.centerText(DocConfig.addBrTags("Assurez-vous que l'ID de l'utilisateur est correct."))}
    ${DocConfig.centerText(DocConfig.addBrTags("Ce sont des datas à fin d'exemples, merci de renseigner les IDs correctement."))}
`;

    