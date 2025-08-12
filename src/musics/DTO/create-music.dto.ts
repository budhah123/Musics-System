import { IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMusicDto {
  @ApiPropertyOptional({ description: 'Title of the music' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Artist of the music' })
  @IsOptional()
  @IsString()
  artist?: string;

  @ApiPropertyOptional({ description: 'Genre of the music' })
  @IsOptional()
  @IsString()
  genre?: string;

  @ApiPropertyOptional({ description: 'Duration in seconds', example: 240 })
  @IsOptional()
  @IsString()
  duration?: string;

  @ApiPropertyOptional({ description: 'URL of the thumbnail image' })
  @IsOptional()
  @IsUrl()
  thumbnail?: string;
}
