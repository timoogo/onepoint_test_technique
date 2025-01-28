import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {

  // id
  @IsOptional()
  @IsNotEmpty({ message: 'L\'id est obligatoire.' })
  @IsNumber({}, { message: 'L\'id doit être un nombre.' })
  @IsPositive({ message: 'L\'id doit être un nombre positif.' })
  id?: number;

  
  @IsNotEmpty({ message: 'Le nom est obligatoire.' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
  @Length(2, 50, { message: 'Le nom doit contenir entre 2 et 50 caractères.' })
  name!: string;

  @IsNotEmpty({ message: 'L\'email est obligatoire.' })
  @IsEmail({}, { message: 'L\'email doit être valide.' })
  email!: string;

  @IsNotEmpty({ message: 'Le mot de passe est obligatoire.' })
  @IsString({ message: 'Le mot de passe doit être une chaîne de caractères.' })
  @Length(8, 128, { message: 'Le mot de passe doit contenir entre 8 et 128 caractères.' })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
    message:
      'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
  })
  password!: string;

  @IsOptional()
  @IsString({ message: 'Le rôle doit être une chaîne de caractères.' })
  @Transform(({ value }) => value?.toLowerCase())
  @Matches(/^(admin|user)$/, {
    message: 'Le rôle doit être "admin", "user".',
  })
  role?: string = 'user';


  constructor(data?: Partial<CreateUserDto>) {
    Object.assign(this, data);
  }
}
