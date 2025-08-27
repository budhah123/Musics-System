import { IsNotEmpty, IsString } from "class-validator";

export class categoryDTO {
  @IsNotEmpty()
  @IsString()
  name: string
}