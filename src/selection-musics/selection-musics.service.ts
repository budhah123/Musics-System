import { Injectable, NotFoundException } from '@nestjs/common';
import { selectionMusicsDTO } from './DTO/create-selection-musics.dto';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class SelectionMusicsService {
  constructor(private readonly firebaseService: FirebaseService) {}
  async saveSelectionMusics(dto: selectionMusicsDTO) {
    const firestore = this.firebaseService.getFirestore();
    const userSnap = firestore.collection('users').doc(dto.userId).get();
    if (!userSnap) {
      throw new NotFoundException(`User not found!`);
    }
    const musicSnap = firestore.collection('musics').doc(dto.musicId).get();
    if (!musicSnap) {
      throw new NotFoundException('Music not Found!');
    }
    const existingSelection = firestore
      .collection('selectedMusics')
      .where('userId', '==', dto.userId)
      .where('musicId', '==', dto.musicId)
      .get();
    if (!existingSelection) {
      throw new NotFoundException('already selected musics');
    }
    await firestore.collection('selectedMusics').add({
      userId: dto.userId,
      musicId: dto.musicId,
      addedAt: new Date(),
    });
    return {
      message: 'Selected Musics Successfully!',
    };
  }

  async getMusicsByUser(userId: string) {
    const firestore = this.firebaseService.getFirestore();
    const snapshot = firestore.collection('selectedMusics').where('userId','==',userId).get();

    const musicsId = (await snapshot).docs.map((doc)=> doc.data().musicId);
    if(!musicsId.length) {
      return [];
    }
    const musicPromises = musicsId.map((id) => firestore.collection('musics').doc(id).get())
    const musicDocs = await Promise.all(musicPromises);

    return musicDocs.filter((doc)=> doc.exists).map((doc)=> ({
      id: doc.id,
      ...doc.data()
    }));
  }
}
