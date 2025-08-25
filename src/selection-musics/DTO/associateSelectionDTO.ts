import { IsOptional, IsString } from "class-validator";

export class associateGuestDTO {
  @IsString()
  userId: string;

  @IsString()
  deviceId: string;

}