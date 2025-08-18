import { Module } from '@nestjs/common';
import { DownloadsService } from './downloads.service';
import { DownloadsController } from './downloads.controller';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  providers: [DownloadsService, FirebaseService],
  controllers: [DownloadsController]
})
export class DownloadsModule {}
