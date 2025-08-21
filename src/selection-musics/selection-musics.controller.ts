import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { selectionMusicsDTO } from './DTO/create-selection-musics.dto';
import { SelectionMusicsService } from './selection-musics.service';

@Controller('selection-musics')
export class SelectionMusicsController {
  constructor(private readonly selectionService: SelectionMusicsService) {}
  @Post()
  async saveSelectedMusics(@Body() dto: selectionMusicsDTO) {
    return this.selectionService.saveSelectionMusics(dto);
  }

  @Get(':userId')
  async getMusicsById(@Param('userId') userId: string) {
    return this.selectionService.getMusicsByUser(userId);
  }
}
