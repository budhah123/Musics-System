import { Module } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { MusicsService } from 'src/musics/musics.service';
import { SelectionMusicsService } from './selection-musics.service';

@Module({})
export class SelectionMusicsModule {
  providers: [FirebaseService, SelectionMusicsService];
  controllers: [SelectionMusicsModule];
}
