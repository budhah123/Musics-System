import {
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

  //   @Delete('/users/:userId')
  // async deleteUserMusic(
  //   @Param('userId') userId: string,

  // ) {
  //   return this.selectionService.deleteMusicsById(userId);
  // }
}
