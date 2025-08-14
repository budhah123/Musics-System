import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MusicsModule } from './musics/musics.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FirebaseModule,
    UsersModule,
    AuthModule,
    MusicsModule,
    FavoritesModule
  ],
})
export class AppModule {}
