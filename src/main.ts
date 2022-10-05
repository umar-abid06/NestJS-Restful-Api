import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;

  const config = new DocumentBuilder()
    .setTitle('api_crud_auth')
    .setDescription('A full crud + authentication API')
    .setVersion('1.0')
    .addTag('Base url : http://localhost:3000/')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(`${PORT}`);
  console.log(`App is running on :http://localhost:${PORT}/`);
}
bootstrap();
