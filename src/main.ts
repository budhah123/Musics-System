import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  dotenv.config();

  //enable CORS for all origins

  app.enableCors({
    origin: '*',
    methods: 'GET, HEAD, PUT, DELETE, POST, PATCH',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Music System API')
    .setDescription('API documentation for Music Library')
    .setVersion('1.0')
    .addTag('musics')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
