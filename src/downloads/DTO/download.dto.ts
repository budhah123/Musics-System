import { IsNotEmpty, IsString} from "class-validator";

export class DownloadDTO {
  @IsString()
  @IsNotEmpty({message: "required!"})
  userId: string;

  @IsString()
  @IsNotEmpty({message:"required!"})
  musicId: string
}