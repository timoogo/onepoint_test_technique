import { Transform } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Matches,
} from "class-validator";
import { UserConfig } from "../config/user.config";

export class CreateUserDto {
  // @IsNotEmpty({ message: UserConfig.ID.REQUIRED_MESSAGE })
  // @IsNumber({}, { message: UserConfig.ID.TYPE_MESSAGE })
  // @IsPositive({ message: UserConfig.ID.POSITIVE_MESSAGE })
  // id!: number;

  @IsNotEmpty({ message: UserConfig.NAME.REQUIRED_MESSAGE })
  @IsString({ message: UserConfig.NAME.TYPE_MESSAGE })
  @Length(UserConfig.NAME_LENGTH.MIN, UserConfig.NAME_LENGTH.MAX, {
    message: UserConfig.NAME.LENGTH_MESSAGE,
  })
  name!: string;

  @IsNotEmpty({ message: UserConfig.EMAIL.REQUIRED_MESSAGE })
  @IsEmail({}, { message: UserConfig.EMAIL.INVALID_MESSAGE })
  email!: string;

  @IsNotEmpty({ message: UserConfig.PASSWORD.REQUIRED_MESSAGE })
  @IsString({ message: UserConfig.PASSWORD.TYPE_MESSAGE })
  @Length(UserConfig.PASSWORD_LENGTH.MIN, UserConfig.PASSWORD_LENGTH.MAX, {
    message: UserConfig.PASSWORD.LENGTH_MESSAGE,
  })
  @Matches(UserConfig.PASSWORD.REGEX, {
    message: UserConfig.PASSWORD.PATTERN_MESSAGE,
  })
  password!: string;

  @IsOptional()
  @IsString({ message: UserConfig.ROLE.TYPE_MESSAGE })
  @Transform(({ value }) => (value ? value.toLowerCase() : UserConfig.ROLE.DEFAULT))
  @Matches(UserConfig.ROLE.PATTERN, {
    message: UserConfig.ROLE.PATTERN_MESSAGE,
  })
  role?: string = UserConfig.ROLE.DEFAULT;

  constructor(data?: Partial<CreateUserDto>) {
    Object.assign(this, data);
  }
}
