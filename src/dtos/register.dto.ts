import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { UserConfig, UserRoles } from '../config/user.config';

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


  @IsOptional()
  @IsEnum(UserRoles, { message: `Le rôle doit être l'une des valeurs suivantes : ${UserConfig.UserRolesArray.join(', ')}.` })
  role: UserRoles = UserRoles.USER;

}