import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(`ContactApp.name`),
  });
  app.setGlobalPrefix('api/v1');

  const options = new DocumentBuilder()
    .setTitle('Contact Store API')
    .setDescription('Contact Store Api System')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(`documentation`, app, document, {
    explorer: false,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
