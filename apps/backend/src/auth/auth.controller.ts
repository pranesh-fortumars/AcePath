import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: Record<string, any>) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Get('seed')
  async seedAdmin() {
    const bcrypt = require('bcrypt');
    const passwordHash = await bcrypt.hash('Admin@123', 10);
    
    await this.prisma.user.upsert({
      where: { email: 'admin' },
      update: {},
      create: {
        email: 'admin',
        passwordHash,
        name: 'Super Admin',
        role: 'ADMIN',
        isOwner: true,
        forcePasswordChange: true,
      },
    });
    return { status: 'Admin account seeded successfully! You can now login.' };
  }
}
