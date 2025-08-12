import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/users/DTO/loginDTO';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      return null;
    }
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const { password: _, ...result } = user;
    return result;
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findUserByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials!');
    }
    if (!dto.password || !user.password) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid Credentials!');
    }
    const payload = {
      email: user.email,
      sub: {
        id: user.id,
      },
    };
    return {
      user: {
        id: user.id,
        email: user.email,
      },
      accessToken: this.jwtService.sign(payload),
    };
  }
}
