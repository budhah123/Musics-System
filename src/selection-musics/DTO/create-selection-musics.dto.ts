import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class selectionMusicsDTO {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  deviceId?: string;

  @IsString()
  musicId: string;

}
