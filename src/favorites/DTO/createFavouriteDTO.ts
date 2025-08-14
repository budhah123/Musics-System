import { IsString } from "class-validator";

export class createFavoriteDTO {
  @IsString()
  userId: string;

  @IsString()
  musicId: string;
  
}