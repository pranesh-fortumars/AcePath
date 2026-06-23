import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private readonly logger = new Logger(FirebaseService.name);
  public app: FirebaseApp;
  public db: Firestore;

  onModuleInit() {
    this.logger.log('Attempting to initialize Firebase fallback layer...');
    
    try {
      const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID
      };

      if (!firebaseConfig.apiKey) {
        this.logger.warn('Firebase config missing. Skipping Firebase initialization.');
        return;
      }

      // Initialize Firebase App
      this.app = initializeApp(firebaseConfig);
      
      // Initialize Firestore (Database)
      this.db = getFirestore(this.app);
      
      this.logger.log('✅ Firebase Web SDK Connected Successfully');
    } catch (error) {
      this.logger.error('❌ Firebase Failed to Initialize', error.message);
    }
  }
}
