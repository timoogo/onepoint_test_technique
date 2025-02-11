import { AppConfig } from "./app.config";
import { ConfigBase } from "./config.base";
export class ArticleConfig extends ConfigBase {
	static readonly TITLE_LENGTH = { MIN: 5, MAX: 100 };
	static readonly DESCRIPTION_LENGTH = { MIN: 10, MAX: 250 };
	static readonly CONTENT_LENGTH = { MIN: 10, MAX: 10000 };
	static readonly TRACE: boolean = true;
	static readonly minimalLogLevel: "DEBUG" | "INFO" | "SUCCESS" | "ERROR" =
		"INFO";

	static readonly DEFAULT_PAGE = AppConfig.DEFAULT_PAGE;
	static readonly DEFAULT_LIMIT = AppConfig.DEFAULT_LIMIT;;
	static readonly PAGE_MIN_LIMIT = AppConfig.PAGE_MIN_LIMIT;
	static readonly PAGE_MAX_LIMIT = AppConfig.PAGE_MAX_LIMIT;;
}

export const ArticleMessages = {
	TITLE_REQUIRED: "Le titre est obligatoire",
	TITLE_LENGTH: `Le titre doit contenir entre ${ArticleConfig.TITLE_LENGTH.MIN} et ${ArticleConfig.TITLE_LENGTH.MAX} caractères`,

	DESCRIPTION_REQUIRED: "La description est obligatoire",
	DESCRIPTION_LENGTH: `La description doit contenir entre ${ArticleConfig.DESCRIPTION_LENGTH.MIN} et ${ArticleConfig.DESCRIPTION_LENGTH.MAX} caractères`,

	CONTENT_REQUIRED: "Le contenu est obligatoire",
	CONTENT_LENGTH: `Le contenu doit contenir entre ${ArticleConfig.CONTENT_LENGTH.MIN} et ${ArticleConfig.CONTENT_LENGTH.MAX} caractères`,
};

