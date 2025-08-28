import { IsString } from 'class-validator';

export class AnswerQuestionDTO {
  @IsString()
  userId: string;

  @IsString()
  optionId: string;
}
