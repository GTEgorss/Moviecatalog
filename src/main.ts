import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));

  const config = new DocumentBuilder()
    .setTitle('moviecatalog')
    .setDescription('moviecatalog API description')
    .setVersion('1.0')
    .addTag('User')
    .addTag('Movie')
    .addTag('Playlist')
    .addTag('Review')
    .addTag('WatchLaterMovie')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 6974;
  console.log(`Port: ${port}`);
  await app.listen(port);
}

bootstrap();
