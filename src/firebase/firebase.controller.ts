import { Controller, Get } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Controller('firebase')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Get('test')
  async test() {
    return await this.firebaseService.testConnection();
  }
}
