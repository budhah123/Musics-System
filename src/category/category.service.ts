import { Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      if (!categoryId || typeof categoryId !== 'string') {
        return { message: 'Invalid categoryId provided!' };
      }

      const firestore = this.firebaseService.getFirestore();
      const categoryDoc = await firestore
        .collection('categories')
        .doc(categoryId)
        .get();

      if (!categoryDoc.exists) {
        return { message: 'Category not Found!' };
      }

      // ✅ Fetch musics that belong to this category
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
          id: categoryDoc.id, // ✅ safer than trusting the param
          ...categoryDoc.data(),
        },
        musics,
      };
    } catch (error) {
      console.error('Error in findCategoryById:', error);
      return { message: 'Something went wrong while fetching category data.' };
    }
  }
  async findAllCategory() {
  const firestore = this.firebaseService.getFirestore();
  const categorySnap = await firestore.collection('categories').get();

  console.log('Docs from Firebase:', categorySnap.docs.map(doc => doc.data()));

  if (categorySnap.empty) {
    throw new NotFoundException('Category Not Found!');
  }

  const categories = categorySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log('Mapped categories:', categories);

  return categories; // <-- return array directly, not { id: 'categories' }
}
}
