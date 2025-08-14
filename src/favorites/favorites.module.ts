import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FirebaseService } from 'src/firebase/firebase.service';
import { MusicsModule } from 'src/musics/musics.module';

@Module({
  // imports:[MusicsModule],
  providers: [FavoritesService, FirebaseService],
  controllers: [FavoritesController]
})
export class FavoritesModule {}
