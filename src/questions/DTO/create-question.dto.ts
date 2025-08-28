import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

class createOptionDTO {
  @IsString()
  label: string;

  @IsString()
  linkTo?: string;
}
export class createQuestionDto {
  @IsString()
  text: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => createOptionDTO)
  options: createOptionDTO[];
}
