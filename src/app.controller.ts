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
  @Render('index')
  index() {
    return { loggedIn: loggedIn, username: username };
  }

  @Get('/lists')
  @Render('lists')
  lists() {
    return { loggedIn: loggedIn, username: username };
  }

  @Get('/favorites')
  @Render('favorites')
  favorites() {
    return { loggedIn: loggedIn, username: username };
  }

  @Get('/explore')
  @Render('explore')
  explore() {
    return { loggedIn: loggedIn, username: username };
  }

  @Get('/watchlater')
  @Render('watchlater')
  watchlater() {
    return { loggedIn: loggedIn, username: username };
  }

  @Get('/style')
  @Render('style')
  style(@Res() res: Response) {
    return { loggedIn: false, username: username };
  }
}
