import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({});
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Prisma Postgres Connected Successfully');
    } catch (e) {
      console.error('❌ Prisma Failed to Connect. Backend is starting anyway!', e.message);
    }
  }
}
