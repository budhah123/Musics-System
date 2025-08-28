import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  providers: [QuestionsService, FirebaseService],
  controllers: [QuestionsController]
})
export class QuestionsModule {}
