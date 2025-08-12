import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDTO } from './DTO/Register.DTO';
import { UpdateUserDto } from './DTO/update-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guards';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDTO })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() dto: RegisterDTO) {
    return await this.usersService.createUser(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users' })
  async getAllUser() {
    return await this.usersService.findAllUser();
  }

  @Get('by-email')
  @ApiOperation({ summary: 'Get user by email' })
  @ApiQuery({ name: 'email', required: true, description: 'User email' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserByEmail(@Query('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
   @ApiOperation({
    summary: 'Delete user by ID',
    description: 'Requires JWT authentication',
  })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT required' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  @ApiOperation({
    summary: 'Update user by ID',
    description: 'Requires JWT authentication',
  })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT required' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(id, updateUserDto);
  }
}
