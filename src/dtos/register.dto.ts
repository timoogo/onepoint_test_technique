import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: "L'adresse email est invalide." })
  @IsNotEmpty({ message: "L'email est requis." })
  email!: string;

  @IsNotEmpty({ message: "Le nom est requis." })
  @MinLength(3, { message: "Le nom doit contenir au moins 3 caractères." })
  name!: string;

  @IsNotEmpty({ message: "Le mot de passe est requis." })
  @MinLength(6, { message: "Le mot de passe doit contenir au moins 6 caractères." })
  password!: string;
}