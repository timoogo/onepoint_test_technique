export class ArticleConfig {
  static readonly TITLE_LENGTH = { MIN: 5, MAX: 100 };
  static readonly DESCRIPTION_LENGTH = { MIN: 10, MAX: 250 };
  static readonly CONTENT_LENGTH = { MIN: 10, MAX: 10000 };
}



export const ArticleMessages = {
  TITLE_REQUIRED: "Le titre est obligatoire",
  TITLE_LENGTH: `Le titre doit contenir entre ${ArticleConfig.TITLE_LENGTH.MIN} et ${ArticleConfig.TITLE_LENGTH.MAX} caractères`,
  
  DESCRIPTION_REQUIRED: "La description est obligatoire",
  DESCRIPTION_LENGTH: `La description doit contenir entre ${ArticleConfig.DESCRIPTION_LENGTH.MIN} et ${ArticleConfig.DESCRIPTION_LENGTH.MAX} caractères`,

  CONTENT_REQUIRED: "Le contenu est obligatoire",
  CONTENT_LENGTH: `Le contenu doit contenir entre ${ArticleConfig.CONTENT_LENGTH.MIN} et ${ArticleConfig.CONTENT_LENGTH.MAX} caractères`,
};

