import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MongoModule } from './mongo/mongo.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [PrismaModule, MongoModule, FirebaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
