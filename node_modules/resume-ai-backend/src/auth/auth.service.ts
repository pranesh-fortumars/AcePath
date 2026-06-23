import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MongoService } from '../mongo/mongo.service';
import { FirebaseService } from '../firebase/firebase.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { doc, getDoc } from 'firebase/firestore';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private mongo: MongoService,
    private firebase: FirebaseService,
    private jwtService: JwtService
  ) {}

  async login(email: string, pass: string) {
    let user = null;

    // 1. Try Prisma (Primary)
    try {
      user = await this.prisma.user.findUnique({ where: { email } });
    } catch (e) {
      console.warn('Prisma query failed, falling back to Mongo...');
    }

    // 2. Try Mongo (Fallback 1)
    if (!user) {
      try {
        const mongoose = this.mongo.getMongoose();
        if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
          const collection = mongoose.connection.db.collection('users');
          user = await collection.findOne({ email });
        }
      } catch (e) {
        console.warn('Mongo query failed, falling back to Firebase...');
      }
    }

    // 3. Try Firebase (Fallback 2)
    if (!user && this.firebase.db) {
      try {
        const userDoc = await getDoc(doc(this.firebase.db, 'users', email));
        if (userDoc.exists()) {
          user = userDoc.data();
          user.id = email; // Firebase uses email as doc ID for simplicity
        }
      } catch (e) {
        console.warn('Firebase query failed.');
      }
    }
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role, isOwner: user.isOwner, forcePasswordChange: user.forcePasswordChange };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isOwner: user.isOwner,
        forcePasswordChange: user.forcePasswordChange
      }
    };
  }
}
