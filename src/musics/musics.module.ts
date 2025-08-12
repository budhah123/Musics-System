import { Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';
import { FirebaseService } from 'src/firebase/firebase.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[AuthModule],
  providers: [MusicsService, FirebaseService],
  controllers: [MusicsController]
})
export class MusicsModule {}
