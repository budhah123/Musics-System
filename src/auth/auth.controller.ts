import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from 'src/users/DTO/loginDTO';
import { RegisterDTO } from 'src/users/DTO/Register.DTO';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UsersService
  ) {}
  @Post('login')
  @ApiOperation({ summary: 'User login and get JWT token' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login successful, JWT returned' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() dto:LoginDto) {
    return await this.authService.login(dto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDTO })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async register(@Body() dto:RegisterDTO) {
    return this.userService.createUser(dto);
  }

}
