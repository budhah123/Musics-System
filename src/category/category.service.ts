import { Injectable } from '@nestjs/common';
import { categoryDTO } from './DTO/create-category.dto';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class CategoryService {
  constructor(private firebaseService: FirebaseService) {}
  async createCategory(dto: categoryDTO) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = await firestore.collection('categories').add({
      name: dto.name,
    });
    const newDoc = await docRef.get();
    return {
      id: newDoc.id,
      ...newDoc.data(),
    };
  }
  async findCategoryById(categoryId: string) {
    const firestore = this.firebaseService.getFirestore();
    const categoryDoc = await firestore
      .collection('categories')
      .doc(categoryId)
      .get();
    if (!categoryDoc.exists) {
      return {
        message: 'Category not Found!',
      };
    }
    const musicSnap = await firestore
      .collection('musics')
      .where('categoryId', '==', categoryId)
      .get();

    const musics = musicSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return {
      category: {
        id: categoryId,
        ...categoryDoc.data(),
      },
      musics,
    };
  }
}
