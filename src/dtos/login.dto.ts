import { IsEmail, IsNotEmpty } from "class-validator";
import { UserConfig } from "../config/user.config";

export class LoginDto {
  @IsEmail({}, { message: UserConfig.EMAIL.INVALID_MESSAGE })
  @IsNotEmpty({ message: UserConfig.EMAIL.REQUIRED_MESSAGE })
  email!: string;

  @IsNotEmpty({ message: UserConfig.PASSWORD.REQUIRED_MESSAGE })
  password!: string;

}
