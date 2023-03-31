import { Controller, Get, Render, Res, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { MyInterceptor } from './interceptor';

const loggedIn = true;
const username = 'GTEgorss';

@Controller()
@UseInterceptors(MyInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/')
  index(@Res() res: Response) {
    return res.render('main', {
      layout: 'index',
      loggedIn: loggedIn,
      username: username,
    });
  }

  @Get('/lists')
  lists(@Res() res: Response) {
    return res.render('main', {
      layout: 'lists',
      loggedIn: loggedIn,
      username: username,
    });
  }

  @Get('/favorites')
  favorites(@Res() res: Response) {
    return res.render('main', {
      layout: 'favorites',
      loggedIn: loggedIn,
      username: username,
    });
  }

  @Get('/explore')
  explore(@Res() res: Response) {
    return res.render('main', {
      layout: 'explore',
      loggedIn: loggedIn,
      username: username,
    });
  }

  @Get('/watchlater')
  watchlater(@Res() res: Response) {
    return res.render('main', {
      layout: 'watchlater',
      loggedIn: loggedIn,
      username: username,
    });
  }

  @Get('/style')
  style(@Res() res: Response) {
    return res.render('main', {
      layout: 'style',
      loggedIn: false,
      username: username,
    });
  }
}
