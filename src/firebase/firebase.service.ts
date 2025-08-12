import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private firestore: FirebaseFirestore.Firestore;
  private storageBucket: any; // Use any or unknown to avoid TS errors
  private readonly logger = new Logger(FirebaseService.name);

  constructor(private configService: ConfigService) {
    try {
      if (admin.apps.length === 0) {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
            clientEmail: this.configService.get<string>(
              'FIREBASE_CLIENT_EMAIL',
            ),
            privateKey: this.configService
              .get<string>('FIREBASE_PRIVATE_KEY')
              ?.replace(/\\n/g, '\n'),
          }),
          storageBucket: this.configService.get<string>(
            'FIREBASE_STORAGE_BUCKET',
          ),
        });
        this.logger.log('Firebase Admin SDK initialized successfully.');
      }

      this.firestore = admin.firestore();
      this.storageBucket = admin.storage().bucket(); // no explicit type, just assign
    } catch (error) {
      this.logger.error('Failed to initialize Firebase Admin SDK', error);
      throw new InternalServerErrorException(
        'Failed to initialize Firebase connection',
      );
    }
  }

  getFirestore(): FirebaseFirestore.Firestore {
    if (!this.firestore) {
      this.logger.error('Firestore instance is not initialized');
      throw new InternalServerErrorException('Firestore is not initialized');
    }
    return this.firestore;
  }

  getBucket(): any {
    // return type any to avoid type errors
    if (!this.storageBucket) {
      this.logger.error('Storage bucket instance is not initialized');
      throw new InternalServerErrorException(
        'Storage bucket is not initialized',
      );
    }
    return this.storageBucket;
  }

  async testConnection(): Promise<string> {
    try {
      const testDocRef = this.firestore
        .collection('test')
        .doc('connectionCheck');
      await testDocRef.set({
        message: 'Firebase is connected!',
        timestamp: new Date(),
      });
      return 'Firebase connection is successful!';
    } catch (error) {
      this.logger.error('Firebase connection test failed', error);
      throw error;
    }
  }
}
