import { Transform } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from "class-validator";
import { UserConfig } from "../config/user.config";
import { UserMessages } from "../messages/user.messages";

export class CreateUserDTO {
  @IsNotEmpty({ message: UserMessages.NAME_REQUIRED })
  @IsString({ message: UserMessages.NAME_TYPE })
  @Length(UserConfig.NAME_LENGTH.MIN, UserConfig.NAME_LENGTH.MAX, {
    message: UserMessages.NAME_LENGTH,
  })
  name!: string;

  @IsNotEmpty({ message: UserMessages.EMAIL_REQUIRED })
  @IsEmail({}, { message: UserMessages.EMAIL_INVALID })
  email!: string;

  @IsNotEmpty({ message: UserMessages.PASSWORD_REQUIRED })
  @IsString({ message: UserMessages.PASSWORD_TYPE })
  @Length(UserConfig.PASSWORD_LENGTH.MIN, UserConfig.PASSWORD_LENGTH.MAX, {
    message: UserMessages.PASSWORD_LENGTH,
  })
  @Matches(UserConfig.PASSWORD.REGEX, {
    message: UserMessages.PASSWORD_PATTERN,
  })
  password!: string;

  @IsOptional()
  @IsString({ message: UserMessages.ROLE_TYPE })
  @Transform(({ value }) => (value ? value.toUpperCase() : UserConfig.ROLE.DEFAULT))
  @Matches(UserConfig.ROLE.PATTERN, {
    message: UserMessages.ROLE_PATTERN,
  })
  role?: string = UserConfig.ROLE.DEFAULT;

}
