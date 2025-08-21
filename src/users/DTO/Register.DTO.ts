import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterDTO {
  @IsString()
  @MinLength(3, {message: " Full Name must be at least 3 characters"})
  FullName: string;

  @IsEmail({}, {message: "Email must be a valid email address"})
  email:string;

  @IsString()
  @MinLength(6, {message: "Password must be at least 6 characters"})
  password: string;

  @IsOptional()
  @IsString()
  userType?: string = 'users';

  // @IsOptional()
  // isSubscribed?: boolean = false;
}