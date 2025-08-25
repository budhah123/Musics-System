import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { selectionMusicsDTO } from './DTO/create-selection-musics.dto';
import { SelectionMusicsService } from './selection-musics.service';
import { associateGuestDTO } from './DTO/associateSelectionDTO';

@Controller('selection-musics')
export class SelectionMusicsController {
  constructor(private readonly selectionService: SelectionMusicsService) {}
  @Post()
  async saveSelectedMusics(@Body() dto: selectionMusicsDTO) {
    return await this.selectionService.saveSelectionMusics(dto);
  }
  @Get()
  async getMusicsById(
    @Query('userId') userId?: string,
    @Query('deviceId') deviceId?: string,
  ) {
    return await this.selectionService.getMusicsByUser(userId, deviceId);
  }
  @Post('associate-guest')
  async associateGuest(@Body() dto: associateGuestDTO) {
    if (!dto.userId || !dto.deviceId) {
      throw new BadRequestException('Both userId and deviceId are required');
    }
    return await this.selectionService.associateGuestSelection(
      dto.userId,
      dto.deviceId,
    );
  }

  @Delete('/:userId/:musicId')
  async deleteMusicById(@Param('userId') userId: string,@Param('musicId') musicId: string) {
    if(!userId || !musicId) {
      throw new BadRequestException('Both userId and MusicId are required!');
    }
    return await this.selectionService.deleteMusicsById(userId,musicId)
  }
}
