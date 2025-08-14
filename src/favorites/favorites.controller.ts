import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { FavoritesService } from './favorites.service';
import { createFavoriteDTO } from './DTO/createFavouriteDTO';

@Controller('favorites')
export class FavoritesController {
  constructor(
    private readonly favoriteService: FavoritesService
  ) {}

  @Post()
  async addFavorite(@Body() dto:createFavoriteDTO ) {
    return await this.favoriteService.addFavorites(dto);
  }

  @Delete()
  async removeFavorite(@Body() dto:createFavoriteDTO) {
    return await this.favoriteService.removeFavorites(dto);
  }
  @Get('/users/:userId')
  async getUserFavorite(@Param('userId') userId: string) {
    return await this.favoriteService.getUserFavorites(userId);
  }
}
