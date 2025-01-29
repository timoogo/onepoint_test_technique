import { IsString, IsNotEmpty, Length } from "class-validator";

export class CreateArticleDTO {
  @IsString()
  @IsNotEmpty({ message: "Le titre est obligatoire" })
  @Length(5, 100, { message: "Le titre doit contenir entre 5 et 100 caractères" })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: "La description est obligatoire" })
  @Length(10, 250, { message: "La description doit contenir entre 10 et 250 caractères" })
  description!: string;

  @IsString()
  @IsNotEmpty({ message: "Le contenu est obligatoire" })
  content!: string;


  constructor(data: Partial<CreateArticleDTO>) {
    Object.assign(this, data);
  }
}
