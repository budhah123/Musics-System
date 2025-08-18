import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { DownloadDTO } from './DTO/download.dto';
import { use } from 'passport';

@Injectable()
export class DownloadsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async saveDownload(dto: DownloadDTO) {
    const firestore = this.firebaseService.getFirestore();
    const downloadRef = firestore.collection('downloads').doc();

    await downloadRef.set({
      userId: dto.userId,
      musicId: dto.musicId,
      downloadedAt: new Date(),
    });
    return { success: true };
  }

  async getUserDownloads(userId: string) {
    const firestore = this.firebaseService.getFirestore();
    const snapshot = await firestore
      .collection('downloads')
      .where('userId', '==', userId)
      .get();

    const musicId = snapshot.docs.map((doc) => doc.data().musicId);
    if (!musicId.length) {
      return [];
    }

    const musicPromises = musicId.map((id) =>
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
    // Fetch music URL from musics collection
  async getMusicUrl(musicId: string): Promise<string | null> {
    const firestore = this.firebaseService.getFirestore();
    const snapshot = await firestore
      .collection('musics')
      .where('musicId', '==', musicId)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return doc.data().url || null;
  }
}

