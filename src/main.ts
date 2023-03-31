import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.engine(
    'hbs',
    hbs({
      extname: 'hbs',
      layoutsDir: join(__dirname, '..', 'views'),
      partialsDir: join(__dirname, '..', 'views/partials'),
    }),
  );

  app.setViewEngine('hbs');

  console.log('Port: ' + (process.env.PORT || 6974));
  await app.listen(process.env.PORT || 6974);
}

bootstrap();
