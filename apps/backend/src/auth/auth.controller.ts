import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
import { MongoService } from '../mongo/mongo.service';
import { FirebaseService } from '../firebase/firebase.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { doc, setDoc } from 'firebase/firestore';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
    private mongo: MongoService,
    private firebase: FirebaseService
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
    const adminData = {
      email: 'admin',
      passwordHash,
      name: 'Super Admin',
      role: Role.ADMIN,
      isOwner: true,
      forcePasswordChange: true,
    };
    
    const statuses = [];

    // 1. Seed Prisma
    try {
      await this.prisma.user.upsert({
        where: { email: 'admin' },
        update: {},
        create: adminData,
      });
      statuses.push('Prisma: OK');
    } catch (e) {
      statuses.push('Prisma: FAIL');
    }

    // 2. Seed Mongo
    try {
      const mongoose = this.mongo.getMongoose();
      if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
        const collection = mongoose.connection.db.collection('users');
        await collection.updateOne({ email: 'admin' }, { $setOnInsert: adminData }, { upsert: true });
        statuses.push('Mongo: OK');
      } else {
        statuses.push('Mongo: OFFLINE');
      }
    } catch (e) {
      statuses.push('Mongo: FAIL');
    }

    // 3. Seed Firebase
    try {
      if (this.firebase.db) {
        await setDoc(doc(this.firebase.db, 'users', 'admin'), adminData, { merge: true });
        statuses.push('Firebase: OK');
      } else {
        statuses.push('Firebase: OFFLINE');
      }
    } catch (e) {
      statuses.push('Firebase: FAIL');
    }

    return { status: `Seed execution finished. Statuses: ${statuses.join(' | ')}` };
  }
}
