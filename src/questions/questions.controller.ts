import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createQuestionDto } from './DTO/create-question.dto';
import { QuestionsService } from './questions.service';
import { get } from 'http';
import { AnswerQuestionDTO } from './DTO/answer-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @Post()
  async create(@Body() dto: createQuestionDto) {
    return await this.questionService.create(dto);
  }

  @Get(':id')
  async FindOneQuestion(@Param('id') id: string) {
    return await this.questionService.findOne(id);
  }
  @Get()
  async findAllQuestion() {
    return await this.questionService.findAll();
  }
  @Post('/:id/answer')
  async saveAnswer(
    @Param('id') questionId: string,
    @Body() dto: AnswerQuestionDTO,
  ) {
    return await this.questionService.saveUserAnswer(
      dto.userId,
      questionId,
      dto.optionId,
    );
  }
}
