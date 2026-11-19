import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global request validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Enable CORS
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
