import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { FirebaseModule } from 'src/firebase/firebase.module';


@Module({
  imports: [JwtModule.register({
    secret: 'secretjwt4565', 
    signOptions: { expiresIn: '1h' },
  }),
   FirebaseModule],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
