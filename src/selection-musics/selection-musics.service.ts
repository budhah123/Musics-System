import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { selectionMusicsDTO } from './DTO/create-selection-musics.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Music } from 'src/musics/musics.entity';

@Injectable()
export class SelectionMusicsService {
  constructor(private readonly firebaseService: FirebaseService) {}
  async saveSelectionMusics(dto: selectionMusicsDTO) {
    const firestore = this.firebaseService.getFirestore();
    if (dto.userId) {
      const userSnap = await firestore
        .collection('users')
        .doc(dto.userId)
        .get();
      if (!userSnap.exists) {
        throw new NotFoundException('Users not Found.');
      }
    }
    const musicSnap = await firestore
      .collection('musics')
      .doc(dto.musicId)
      .get();
    if (!musicSnap.exists) {
      throw new NotFoundException('Music not Found!');
    }

    let queryRef = firestore
      .collection('selectedMusics')
      .where('musicId', '==', dto.musicId);

    if (dto.userId) {
      queryRef = queryRef.where('userId', '==', dto.userId);
    } else if (dto.deviceId) {
      queryRef = queryRef.where('deviceId', '==', dto.deviceId);
    } else {
      throw new BadRequestException(
        'Either userId or DeviceId must be provided',
      );
    }

    const existingSnap = await queryRef.get();
    if (!existingSnap.empty) {
      return {
        message: 'Already selected this music!',
      };
    }
    await firestore.collection('selectedMusics').add({
      userId: dto.userId || null,
      deviceId: dto.deviceId || null,
      musicId: dto.musicId,
      addedAt: new Date(),
    });
    return {
      message: 'Musics Selected Successfully!',
    };
  }

  async getMusicsByUser(userId?: string, deviceId?: string) {
    const firestore = this.firebaseService.getFirestore();
    if (!userId && !deviceId) {
      throw new BadRequestException(
        'Either userId and MusicId must be provided!',
      );
    }
    const collectionRef = firestore.collection('selectedMusics'); // CollectionReference
    let queryRef: FirebaseFirestore.Query = collectionRef;
    if (userId) {
      queryRef = queryRef.where('userId', '==', userId);
    } else if (deviceId) {
      queryRef = queryRef.where('deviceId', '==', deviceId);
    } else {
      throw new BadRequestException(
        'either userId not DeviceId must be provided!',
      );
    }
    console.log('Querying selections for:', { userId, deviceId });

    const musicSelects = await queryRef.get();
    const musicsId = musicSelects.docs.map((doc) => doc.data().musicId);

    if (!musicsId.length) {
      return [];
    }
    const musicPromises = musicsId.map((id) =>
      firestore.collection('musics').doc(id).get(),
    );
    const musicDocs = await Promise.all(musicPromises);

    return musicDocs
      .filter((doc) => doc.exists)
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  }

  async deleteMusicsById(userId: string, musicId: string) {
    const firestore = this.firebaseService.getFirestore();
    const querySnap = await firestore
      .collection('selectedMusics')
      .where('userId', '==', userId)
      .where('musicId', '==', musicId)
      .get();
    if (querySnap.empty) {
      return {
        message: `No selection found for userId: ${userId} with musicId: ${musicId}`,
      };
    }
    const batch = firestore.batch();
    querySnap.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    return {
      message: ' selected Music Delete Successfully',
      userId,
      musicId,
    };
  }

  async associateGuestSelection(userId: string, deviceId: string) {
    const firestore = this.firebaseService.getFirestore();

    const querySnap = await firestore
      .collection('selectedMusics')
      .where('deviceId', '==', deviceId)
      .where('userId', '==', null)
      .get();

    if (querySnap.empty) {
      return {
        message: 'No guest Selection found for this device!',
      };
    }
    const batch = firestore.batch();
    querySnap.forEach((doc) => {
      batch.update(doc.ref, { userId });
    });
    await batch.commit();
    return {
      message: 'Guest selection linked with user account!',
      userId,
      deviceId,
    };
  }
}
