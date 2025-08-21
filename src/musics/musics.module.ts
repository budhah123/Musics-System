import { Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';
import { FirebaseService } from 'src/firebase/firebase.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports:[AuthModule],
  providers: [MusicsService, FirebaseService, UsersService],
  controllers: [MusicsController]
})
export class MusicsModule {}
