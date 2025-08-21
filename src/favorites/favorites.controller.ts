import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { FavoritesService } from './favorites.service';
import { createFavoriteDTO } from './DTO/createFavouriteDTO';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(
    private readonly favoriteService: FavoritesService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Add a favorite item for a user' })
  @ApiResponse({ status: 201, description: 'Favorite added successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiBody({ type: createFavoriteDTO })
  async addFavorite(@Body() dto:createFavoriteDTO ) {
    return await this.favoriteService.addFavorites(dto);
  }

  @Delete()
  @ApiOperation({ summary: 'Remove a favorite item for a user' })
  @ApiResponse({ status: 200, description: 'Favorite removed successfully' })
  @ApiResponse({ status: 404, description: 'Favorite not found' })
  @ApiBody({ type: createFavoriteDTO })
  async removeFavorite(@Body() dto:createFavoriteDTO) {
    return await this.favoriteService.removeFavorites(dto);
  }
  @Get('/users/:userId')
  @ApiOperation({ summary: 'Get all favorites of a specific user' })
  @ApiResponse({ status: 200, description: 'List of favorites returned successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'userId', type: String, description: 'User ID to fetch favorites for' })
  async getUserFavorite(@Param('userId') userId: string) {
    return await this.favoriteService.getUserFavorites(userId);
  }
}
