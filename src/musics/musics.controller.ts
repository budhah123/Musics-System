import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MusicsService } from './musics.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateMusicDto } from './DTO/create-music.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guards';

@ApiTags('musics')
@ApiBearerAuth()
@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}
  // @UseGuards(JwtGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new music entry' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a music file and thumbnail along with metadata',
    schema: {
      type: 'object',
      properties: {
        musicFile: {
          type: 'string',
          format: 'binary',
          description: 'The music audio file',
        },
        thumbnailFile: {
          type: 'string',
          format: 'binary',
          description: 'The music thumbnail image',
        },
        title: { type: 'string', description: 'Title of the music' },
        artist: { type: 'string', description: 'Artist name' },
        genre: { type: 'string', description: 'genre of the music' },
        duration: { type: 'string', description: 'duration of the musics' },
      },
      required: [
        'musicFile',
        'thumbnailFile',
        'title',
        'artist',
        'genre',
        'duration',
      ],
    },
  })
  @ApiResponse({ status: 201, description: 'Music created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'musicFile', maxCount: 1 },
      { name: 'thumbnailFile', maxCount: 1 },
    ]),
  )
  async createMusic(
    @UploadedFiles()
    files: {
      musicFile?: Express.Multer.File[];
      thumbnailFile?: Express.Multer.File[];
    },
    @Body() dto: CreateMusicDto,
  ) {
    const musicFile = files.musicFile?.[0];
    const thumbnailFile = files.thumbnailFile?.[0];

    if (!musicFile || !thumbnailFile) {
      throw new BadRequestException(
        'Music file and thumbnail file are required',
      );
    }

    return this.musicsService.createMusic(musicFile, thumbnailFile, dto);
  }
  // @UseGuards(JwtGuard)
  @Get()
  @ApiOperation({ summary: 'Retrieve all musics' })
  @ApiResponse({ status: 200, description: 'List of musics retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAllMusics() {
    return this.musicsService.getAllMusics();
  }

  // @UseGuards(JwtGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a music entry by ID' })
  @ApiParam({ name: 'id', description: 'Music ID', type: String })
  @ApiResponse({ status: 200, description: 'Music deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Music not found' })
  async deleteMusic(@Param('id') id: string) {
    return this.musicsService.deleteMusic(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get musics by genre' })
  @ApiQuery({
    name: 'genre',
    type: String,
    description: 'The genre of musics (e.g. rap, pop, hip-Hop)',
    required: true,
  })
  async getMusicsByCategory(@Query('genre') genre: string) {
    return await this.musicsService.getMusicsByCategory(genre);
  }
  @Get(':id')
  async getMusicById(@Param('id') id: string) {
    return await this.musicsService.getMusicsById(id);
  }
}
