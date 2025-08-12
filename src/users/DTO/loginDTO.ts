import { IsEmail, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail({},{message: "email must be valid email address"})
  email:string;

  @MinLength(6, {message:"Password must be at least 6 character"})
  password: string;

}