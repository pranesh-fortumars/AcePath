import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class MongoService implements OnModuleInit {
  private readonly logger = new Logger(MongoService.name);

  async onModuleInit() {
    this.logger.log('Attempting to connect to MongoDB...');
    
    // Connect to MongoDB using the raw native mongoose driver without blocking the application.
    // If it fails, we catch the error but allow NestJS to continue booting!
    try {
      if (!process.env.MONGODB_URI) {
        this.logger.warn('MONGODB_URI is not set. Skipping MongoDB connection.');
        return;
      }
      
      // Do not use await here if you want it to completely bypass NestJS blocking,
      // but Mongoose connection requires await to throw locally. We'll catch it.
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
      });
      this.logger.log('✅ MongoDB Connected Successfully');
    } catch (error) {
      this.logger.error('❌ MongoDB Failed to Connect. Backend is starting anyway!', error.message);
    }
  }

  // Helper to get the mongoose instance if needed dynamically
  getMongoose() {
    return mongoose;
  }
}
