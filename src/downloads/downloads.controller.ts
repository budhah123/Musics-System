import { Body, Controller, Get, NotFoundException, Param, Post, Query, Res } from '@nestjs/common';
import { DownloadsService } from './downloads.service';
import { DownloadDTO } from './DTO/download.dto';
import type { Response } from 'express';
@Controller('downloads')
export class DownloadsController {
  constructor(private readonly downloadService: DownloadsService) {}

  @Post()
  async savedDownloads(@Body() dto: DownloadDTO) {
    return await this.downloadService.saveDownload(dto);
  }

  @Get('/users/:userId')
  async getUserDownloads(@Param('userId') userId: string) {
    return await this.downloadService.getUserDownloads(userId);
  }

  @Get('/:musicId')
  async downloadMusic(
    @Param('musicId') musicId: string,
    @Res() res: Response,
  ) {
    // Get the file URL from musics collection
    const fileUrl = await this.downloadService.getMusicUrl(musicId);

    if (!fileUrl) {
      throw new NotFoundException('Music file not found');
    }

    return res.redirect(fileUrl);
  }
}
