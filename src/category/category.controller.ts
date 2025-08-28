import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { categoryDTO } from './DTO/create-category.dto';
import { CategoryService } from './category.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Music Categories')
@Controller('/music')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post('category')
  @ApiOperation({ summary: 'Create a new music category' })
  @ApiBody({ type: categoryDTO, description: 'Category details' })
  @ApiResponse({ status: 201, description: 'Category successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  async saveMusicsCategory(@Body() dto: categoryDTO) {
    return await this.categoryService.createCategory(dto);
  }
  @Get('categories')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'List of all categories' })
  @ApiResponse({ status: 404, description: 'No categories found' })
  async findAllCategory() {
    return await this.categoryService.findAllCategory();
  }
  @ApiOperation({ summary: 'Get musics by category ID' })
  @ApiParam({ name: 'id', description: 'The ID of the category' })
  @ApiResponse({
    status: 200,
    description: 'List of musics found for the category',
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @Get('category/:id')
  async musicsFindByCategory(@Param('id') categoryId: string) {
    return await this.categoryService.findCategoryById(categoryId);
  }
}
