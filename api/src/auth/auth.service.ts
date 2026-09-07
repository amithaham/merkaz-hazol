import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const adminEmail =
      this.configService.getOrThrow<string>('ADMIN_EMAIL');

    const adminPassword =
      this.configService.getOrThrow<string>('ADMIN_PASSWORD');

    const emailMatches =
      loginDto.email.trim().toLowerCase() ===
      adminEmail.trim().toLowerCase();

    const passwordMatches =
      loginDto.password === adminPassword;

    if (!emailMatches || !passwordMatches) {
      throw new UnauthorizedException(
        'Invalid email or password',
      );
    }

    const accessToken = await this.jwtService.signAsync({
      sub: adminEmail,
      role: 'admin',
    });

    return {
      accessToken,
      user: {
        email: adminEmail,
        role: 'admin',
      },
    };
  }
}