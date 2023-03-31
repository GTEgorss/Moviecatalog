import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
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
      index: true,
      lists: false,
      favorites: false,
      explore: false,
      watchlater: false,
      style: false,
    });
  }

  @Get('/lists')
  lists(@Res() res: Response) {
    return res.render('main', {
      layout: 'lists',
      index: false,
      lists: true,
      favorites: false,
      explore: false,
      watchlater: false,
      style: false,
    });
  }

  @Get('/favorites')
  favorites(@Res() res: Response) {
    return res.render('main', {
      layout: 'favorites',
      index: false,
      lists: false,
      favorites: true,
      explore: false,
      watchlater: false,
      style: false,
    });
  }

  @Get('/explore')
  explore(@Res() res: Response) {
    return res.render('main', {
      layout: 'explore',
      index: false,
      lists: false,
      favorites: false,
      explore: true,
      watchlater: false,
      style: false,
    });
  }

  @Get('/watchlater')
  watchlater(@Res() res: Response) {
    return res.render('main', {
      layout: 'watchlater',
      index: false,
      lists: false,
      favorites: false,
      explore: false,
      watchlater: true,
      style: false,
    });
  }

  @Get('/style')
  style(@Res() res: Response) {
    return res.render('main', {
      layout: 'style',
      index: false,
      lists: false,
      favorites: false,
      explore: false,
      watchlater: false,
      style: true,
    });
  }
}
