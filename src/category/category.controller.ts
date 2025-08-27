import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { categoryDTO } from './DTO/create-category.dto';
import { CategoryService } from './category.service';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Music Categories')
@Controller('musics')
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

  @Get()
  @ApiOperation({ summary: 'Get musics by category ID' })
  @ApiQuery({ name: 'categoryId', required: true, description: 'The ID of the category' })
  @ApiResponse({ status: 200, description: 'List of musics found for the category' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async musicsFindByCategory(@Query('categoryId') categoryId: string) {
    return await this.categoryService.findCategoryById(categoryId);
  }
}
