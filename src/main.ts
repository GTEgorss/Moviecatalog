import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import * as hbs from 'hbs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'process';
import { PrismaClient } from '@prisma/client';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception.filter';
import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from './auth/auth.filter';
import * as cookieParser from 'cookie-parser';
import { middleware } from 'supertokens-node/framework/express';

const prisma = new PrismaClient();
export default prisma;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(resolve('./public'));
  app.setBaseViewsDir(resolve('./views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(resolve('./views/partials'));

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new SupertokensExceptionFilter());
  app.use(cookieParser());
  app.use(middleware());

  const config = new DocumentBuilder()
    .setTitle('moviecatalog')
    .setDescription('moviecatalog API description')
    .setVersion('1.0')
    .addTag('User')
    .addTag('Movie')
    .addTag('Playlist')
    .addTag('Review')
    .addTag('WatchLaterMovie')
    .addTag('Auth')
    .addCookieAuth('sAccessToken', { type: 'apiKey' }, 'JWT')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: [process.env.URL],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });

  const port = process.env.PORT || 6974;
  console.log(`Port: ${port}`);
  await app.listen(port);
}

bootstrap()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
