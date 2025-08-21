import { IsArray, IsOptional, IsString } from 'class-validator';

export class selectionMusicsDTO {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsString()
  musicId: string;

  @IsOptional() 
  @IsString()
  deviceId?: string;
}
