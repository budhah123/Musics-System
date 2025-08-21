import { IsString } from "class-validator";

export class selectionMusicsDTO {
  @IsString()
  userId: string;

  @IsString()
  musicId: string;
}