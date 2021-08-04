import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });


  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Tem Razão API Documentation')
    .setDescription(
      'Tem Razão é um aplicativo para auxiliar no ensino de fração de forma ludica para alunos do ensino fundamental',
    )
    .setVersion('1.0')
    .setContact('Tem Razão', 'https://temrazao', 'dev@temrazao.com')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
