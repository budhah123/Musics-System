import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MusicsModule } from './musics/musics.module';
import { FavoritesModule } from './favorites/favorites.module';
import { DownloadsModule } from './downloads/downloads.module';
import { SelectionMusicsService } from './selection-musics/selection-musics.service';
import { SelectionMusicsController } from './selection-musics/selection-musics.controller';
import { SelectionMusicsModule } from './selection-musics/selection-musics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FirebaseModule,
    UsersModule,
    AuthModule,
    MusicsModule,
    FavoritesModule,
    DownloadsModule,
    SelectionMusicsModule
  ],
  providers: [SelectionMusicsService],
  controllers: [SelectionMusicsController],
})
export class AppModule {}
