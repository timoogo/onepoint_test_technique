import { IsNotEmpty, IsString, Length } from "class-validator";
import { ArticleConfig } from "../config/article.config";
import { ArticleMessages } from "../messages/article.messages";

export class CreateArticleDTO {
  @IsString()
  @IsNotEmpty({ message: ArticleMessages.TITLE_REQUIRED })
  @Length(ArticleConfig.TITLE_LENGTH.MIN, ArticleConfig.TITLE_LENGTH.MAX, {
    message: ArticleMessages.TITLE_LENGTH,
  })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: ArticleMessages.DESCRIPTION_REQUIRED })
  @Length(
    ArticleConfig.DESCRIPTION_LENGTH.MIN,
    ArticleConfig.DESCRIPTION_LENGTH.MAX,
    { message: ArticleMessages.DESCRIPTION_LENGTH },
  )
  description!: string;

  @IsString()
  @IsNotEmpty({ message: ArticleMessages.CONTENT_REQUIRED })
  @Length(
    ArticleConfig.CONTENT_LENGTH.MIN,
    ArticleConfig.CONTENT_LENGTH.MAX,
    { message: ArticleMessages.CONTENT_LENGTH },
  )
  content!: string;

}
