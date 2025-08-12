import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateMusicDto } from './DTO/create-music.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class MusicsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  private getStorageFilePath(fileurl: string): string | null {
    try {
      const url = new URL(fileurl);
      const pathname = url.pathname;
      const parts = pathname.split('/o/');
      if (parts.length < 2) return null;
      return decodeURIComponent(parts[1]);
    } catch {
      return null;
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    destinationPath: string,
  ): Promise<string> {
    if (!file) throw new BadRequestException('file missing');

    const bucket = this.firebaseService.getBucket();
    const fileRef = bucket.file(destinationPath);

    // Upload the file buffer with correct content type
    await fileRef.save(file.buffer, {
      contentType: file.mimetype,
    });

    // Generate a signed URL valid until year 2500
    const [url] = await fileRef.getSignedUrl({
      action: 'read',
      expires: new Date('2500-02-01T00:00:00Z'),
    });

    return url;
  }

  async createMusic(
    musicFile: Express.Multer.File,
    thumbnailFile: Express.Multer.File,
    dto: CreateMusicDto,
  ) {
    if (!musicFile || !thumbnailFile) {
      throw new BadRequestException('Music file and thumbnail are required!');
    }

    const firestore = this.firebaseService.getFirestore();

    const musicFilePath = `musics/${Date.now()}_${musicFile.originalname}`;
    const thumbnailFilePath = `thumbnails/${Date.now()}_${thumbnailFile.originalname}`;

    const musicUrl = await this.uploadFile(musicFile, musicFilePath);
    const thumbnailUrl = await this.uploadFile(
      thumbnailFile,
      thumbnailFilePath,
    );

    const docRef = await firestore.collection('musics').add({
      title: dto.title,
      artist: dto.artist,
      genre: dto.genre,
      duration: dto.duration,
      url: musicUrl,
      thumbnail: thumbnailUrl,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return {
      id: docRef.id,
      ...dto,
      url: musicUrl,
      thumbnail: thumbnailUrl,
    };
  }

  async getAllMusics() {
    const firestore = this.firebaseService.getFirestore();

    const snapshot = await firestore
      .collection('musics')
      .orderBy('createdAt', 'desc')
      .get();

    const musics: any[] = [];

    snapshot.forEach((doc) => {
      musics.push({ id: doc.id, ...doc.data() });
    });

    return musics;
  }

  async deleteMusic(id: string) {
    const firestore = this.firebaseService.getFirestore();
    const bucket = this.firebaseService.getBucket();

    const docRef = firestore.collection('musics').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Music not found');
    }

    const data = doc.data();
    if (!data) {
      throw new NotFoundException('Music data not found');
    }

    const musicFilePath = this.getStorageFilePath(data.url);
    const thumbnailFilePath = this.getStorageFilePath(data.thumbnail);

    // Delete music file if exists
    if (musicFilePath) {
      await bucket
        .file(musicFilePath)
        .delete()
        .catch(() => {});
    }

    // Delete thumbnail file if exists
    if (thumbnailFilePath) {
      await bucket
        .file(thumbnailFilePath)
        .delete()
        .catch(() => {});
    }

    // Delete Firestore document
    await docRef.delete();

    return { message: 'Music deleted successfully' };
  }
}
