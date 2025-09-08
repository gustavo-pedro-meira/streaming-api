import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  username?: string;

  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @MinLength(7)
  @IsOptional()
  password?: string;
}
