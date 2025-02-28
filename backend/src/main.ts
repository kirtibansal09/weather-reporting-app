import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config(); // Ensure .env is loaded

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<string>('PORT') || 3000; // Default to 3000

  await app.listen(PORT);
  console.log(`Server is running on http://localhost:${PORT}`);
}
bootstrap();
