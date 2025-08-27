import { IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateMusicDto {
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

  @ApiPropertyOptional({ description: 'Category of the music' })
  @IsOptional()
  @IsString()
  @Transform(({ obj }) => obj.CategoryId || obj.categoryId)
  categoryId?: string;

  @ApiPropertyOptional({ description: 'Duration in seconds' })
  @IsOptional()
  @IsString()
  duration?: string;

  @ApiPropertyOptional({ description: 'URL of the thumbnail image' })
  @IsOptional()
  @IsUrl()
  thumbnail?: string;

  @ApiPropertyOptional({ description: 'URL of the music file' })
  @IsOptional()
  @IsUrl()
  musicFile?: string;
}
