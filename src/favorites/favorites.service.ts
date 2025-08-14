import { Injectable, NotFoundException } from '@nestjs/common';
import { messaging } from 'firebase-admin';
import { FirebaseService } from 'src/firebase/firebase.service';
import { createFavoriteDTO } from './DTO/createFavouriteDTO';
import { create } from 'domain';

@Injectable()
export class FavoritesService {
  constructor(private readonly firebaseService: FirebaseService) {}
  async addFavorites(dto:createFavoriteDTO) {
    const firestore = this.firebaseService.getFirestore();

    const userSnap = await firestore.collection('users').doc(dto.userId).get();
    if (!userSnap) {
      throw new NotFoundException('Users not Found');
    }

    const musicSnap = await firestore.collection('musics').doc(dto.musicId).get();
    if (!musicSnap) {
      throw new NotFoundException('Musics not Found!');
    }

    //checking if already favorite

    const existingFavorite = await firestore
      .collection('favorites')
      .where('userId', '==', dto.userId)
      .where('musicId', '==', dto.musicId)
      .get();
    if (!existingFavorite.empty) {
      return {
        message: 'already in favorites!',
      };
    }
    //add favorites
    await firestore.collection('favorites').add({
      userId: dto.userId,
      musicId: dto.musicId,
      addedAt: new Date(),
    });
    return {
      message: 'Music Added to favorites.',
    };
  }

  async removeFavorites(dto:createFavoriteDTO) {
    const firestore = await this.firebaseService.getFirestore();

    const favs = await firestore
      .collection('favorites')
      .where('userId', '==', dto.userId)
      .where('musicId', '==', dto.musicId)
      .get();

      if(favs.empty) {
        throw new NotFoundException("Favorite not found!");
      }
      for(const doc of favs.docs) {
        await doc.ref.delete();
      }
      return {
        message: "musics removed from favorites"
      }
  }
  async getUserFavorites(userId: string) {
    const firestore = this.firebaseService.getFirestore();
    const favsSnap = await firestore.collection('favorites').where('userId','==',userId).get();

    const musicIds = favsSnap.docs.map(doc => doc.data().musicId);
    if(!musicIds.length){
      return [];
    }
    const musicPromises = musicIds.map(id=> firestore.collection('musics').doc(id).get());
    const musicDocs = await Promise.all(musicPromises);

    return musicDocs.filter(doc=> doc.exists).map(doc =>({
      id: doc.id, ...doc.data()
    }));
  }
}
