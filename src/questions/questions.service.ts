import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { createQuestionDto } from './DTO/create-question.dto';
import { text } from 'stream/consumers';
import { formateDateTimeUTC } from 'src/Format Date/formateDate';

@Injectable()
export class QuestionsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(dto: createQuestionDto) {
    const firestore = this.firebaseService.getFirestore();
    const questionRef = await firestore.collection('questions').add({
      text: dto.text,
      createdAt: formateDateTimeUTC(new Date()),
    });
    const batch = firestore.batch();
    dto.options.forEach((options) => {
      const optionRef = firestore.collection('options').doc();
      batch.set(optionRef, {
        label: options.label,
        linkTo: options.linkTo || null,
        questionId: questionRef.id,
        createdAt: formateDateTimeUTC(new Date()),
      });
    });
    await batch.commit();
    return {
      id: questionRef.id,
      ...dto,
    };
  }

  async findAll() {
    const firestore = this.firebaseService.getFirestore();
    const questionSnap = await firestore.collection('questions').get();

    const results: any[] = [];
    for (const doc of questionSnap.docs) {
      const optionsSnap = await firestore
        .collection('options')
        .where('questionId', '==', doc.id)
        .get();

      results.push({
        id: doc.id,
        ...doc.data(),
        options: optionsSnap.docs.map((o) => ({ id: o.id, ...o.data() })),
      });
    }
    return results;
  }

  async saveUserAnswer(userId: string, questionId: string, optionId: string) {
    const firestore = await this.firebaseService.getFirestore();
    const answerRef = await firestore.collection('userAnswers').add({
      userId,
      questionId,
      optionId,
      createdAt: formateDateTimeUTC(new Date()),
    });
    return {
      message: 'Answer Saved',
      id: answerRef.id,
    };
  }

  async findOne(id: string) {
    const firestore = this.firebaseService.getFirestore();
    const questionDoc = await firestore.collection('questions').doc(id).get();
    if (!questionDoc.exists) {
      throw new NotFoundException(`Questions with id :${id} not Found!`);
    }
    const optionsSnap = await firestore
      .collection('options')
      .where('questionId', '==', id)
      .get();

    return {
      id: questionDoc.id,
      ...questionDoc.data(),
      options: optionsSnap.docs.map((o) => ({
        id: o.id,
        ...o.data(),
      })),
    };
  }
}
