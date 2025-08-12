import { IsOptional, IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  FullName?: string;


  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, {message: "password must be at least 6 character"})
  password?: string;
}