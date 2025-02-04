import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: "L'adresse email est invalide." })
  @IsNotEmpty({ message: "L'email est requis." })
  email!: string;

  @IsNotEmpty({ message: "Le mot de passe est requis." })
  password!: string;

    constructor(data: Partial<User>) {
        Object.assign(this, data);
    }
}