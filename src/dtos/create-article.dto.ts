import { IsNotEmpty, IsString, Length } from "class-validator";
import { ArticleService } from "../services/article.service";

export class CreateArticleDTO {
	@IsString()
	@IsNotEmpty({ message: "Le titre est obligatoire" })
	@Length(ArticleService.TITLE_LENGTH.MIN, ArticleService.TITLE_LENGTH.MAX, {
		message: `Le titre doit contenir entre ${ArticleService.TITLE_LENGTH.MIN} et ${ArticleService.TITLE_LENGTH.MAX} caractères`,
	})
	title!: string;

	@IsString()
	@IsNotEmpty({ message: `La description est obligatoire` })
	@Length(
		ArticleService.DESCRIPTION_LENGTH.MIN,
		ArticleService.DESCRIPTION_LENGTH.MAX,
		{ message: `La description doit contenir entre ${ArticleService.DESCRIPTION_LENGTH.MIN} et ${ArticleService.DESCRIPTION_LENGTH.MAX} caractères` },
	)
	description!: string;

	@IsString()
	@IsNotEmpty({ message: "Le contenu est obligatoire" })
  @Length(10, 10000, { message: `Le contenu doit contenir entre ${ArticleService.CONTENT_LENGTH.MIN} et ${ArticleService.CONTENT_LENGTH.MAX} caractères` })
	content!: string;

	constructor(data: Partial<CreateArticleDTO>) {
		Object.assign(this, data);
	}
}
