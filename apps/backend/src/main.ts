import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Allow frontend at 3000 to talk to backend at 3001
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
