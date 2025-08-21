import { Body, Controller, Get, NotFoundException, Param, Post, Query, Res } from '@nestjs/common';
import { DownloadsService } from './downloads.service';
import { DownloadDTO } from './DTO/download.dto';
import type { Response } from 'express';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Downloads')
@Controller('downloads')
export class DownloadsController {
  constructor(private readonly downloadService: DownloadsService) {}

  @Post()
  @ApiOperation({ summary: 'Save a download record for a user' })
  @ApiResponse({ status: 201, description: 'Download saved successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request body' })
  @ApiBody({ type: DownloadDTO })
  async savedDownloads(@Body() dto: DownloadDTO) {
    return await this.downloadService.saveDownload(dto);
  }

  @Get('/users/:userId')
  @ApiOperation({ summary: 'Get all downloads of a specific user' })
  @ApiResponse({ status: 200, description: 'List of downloads returned successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'userId', type: String, description: 'The ID of the user' })
  async getUserDownloads(@Param('userId') userId: string) {
    return await this.downloadService.getUserDownloads(userId);
  }

  @Get('/:musicId')
  @ApiOperation({ summary: 'Download music by ID (redirect to file URL)' })
  @ApiResponse({ status: 302, description: 'Redirect to the music file URL' })
  @ApiResponse({ status: 404, description: 'Music file not found' })
  @ApiParam({ name: 'musicId', type: String, description: 'The ID of the music track' })
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
