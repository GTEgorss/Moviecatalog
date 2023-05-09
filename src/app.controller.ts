import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Render,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseTimeInterceptor } from './interceptor';
import { ApiExcludeController } from '@nestjs/swagger';
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { Response } from 'express';

let loggedIn = false;
let username = null;

@ApiExcludeController()
@Controller()
@UseInterceptors(ResponseTimeInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Render('index')
  async index(@Res() response: Response, @Session() session: SessionContainer) {
    if (session !== undefined) {
      username = await this.appService.getUsernameByExternalId(
        session.getUserId(),
      );
      loggedIn = true;

      response.cookie('username', username);
    } else {
      loggedIn = false;
      username = null;
    }

    return { loggedIn: loggedIn, username: username };
  }

  @Get('/lists')
  @UseGuards(new AuthGuard())
  @Render('lists')
  async lists(@Res() response: Response, @Session() session: SessionContainer) {
    username = await this.appService.getUsernameByExternalId(
      session.getUserId(),
    );
    loggedIn = true;

    response.cookie('username', username);

    return { loggedIn: loggedIn, username: username };
  }

  @Get('/favorites')
  @UseGuards(new AuthGuard())
  @Render('favorites')
  async favorites(
    @Res() response: Response,
    @Session() session: SessionContainer,
  ) {
    username = await this.appService.getUsernameByExternalId(
      session.getUserId(),
    );
    loggedIn = true;

    response.cookie('username', username);

    return { loggedIn: loggedIn, username: username };
  }

  @Get('/watchlater')
  @UseGuards(new AuthGuard())
  @Render('watchlater')
  async watchlater(
    @Res() response: Response,
    @Session() session: SessionContainer,
  ) {
    username = await this.appService.getUsernameByExternalId(
      session.getUserId(),
    );
    loggedIn = true;

    response.cookie('username', username);

    return { loggedIn: loggedIn, username: username };
  }

  @Get('/search')
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Render('search')
  async search(
    @Res() response: Response,
    @Session() session: SessionContainer,
  ) {
    if (session !== undefined) {
      username = await this.appService.getUsernameByExternalId(
        session.getUserId(),
      );
      loggedIn = true;

      response.cookie('username', username);
    } else {
      loggedIn = false;
      username = null;
    }

    return { loggedIn: loggedIn, username: username };
  }

  @Get('/explore')
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Render('explore')
  async explore(
    @Res() response: Response,
    @Session() session: SessionContainer,
  ) {
    if (session !== undefined) {
      username = await this.appService.getUsernameByExternalId(
        session.getUserId(),
      );
      loggedIn = true;

      response.cookie('username', username);
    } else {
      loggedIn = false;
      username = null;
    }

    return { loggedIn: loggedIn, username: username };
  }

  @Get('/style')
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Render('style')
  async style(@Res() response: Response, @Session() session: SessionContainer) {
    if (session !== undefined) {
      username = await this.appService.getUsernameByExternalId(
        session.getUserId(),
      );
      loggedIn = true;

      response.cookie('username', username);
    }

    return { loggedIn: false, username: username };
  }

  @Get('/signup')
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Render('signup')
  async signup(
    @Res() response: Response,
    @Session() session: SessionContainer,
  ) {
    if (session !== undefined) {
      username = await this.appService.getUsernameByExternalId(
        session.getUserId(),
      );
      loggedIn = true;

      response.cookie('username', username);
    } else {
      loggedIn = false;
      username = null;
    }

    return { loggedIn: loggedIn, username: username };
  }

  @Get('/login')
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Render('login')
  async login(@Res() response: Response, @Session() session: SessionContainer) {
    if (session !== undefined) {
      username = await this.appService.getUsernameByExternalId(
        session.getUserId(),
      );
      loggedIn = true;

      response.cookie('username', username);
    } else {
      loggedIn = false;
      username = null;
    }

    return { loggedIn: loggedIn, username: username };
  }

  @Get('/createlist')
  @UseGuards(new AuthGuard())
  @Render('createlist')
  async createlist(
    @Res() response: Response,
    @Session() session: SessionContainer,
  ) {
    username = await this.appService.getUsernameByExternalId(
      session.getUserId(),
    );
    loggedIn = true;

    response.cookie('username', username);

    return { loggedIn: loggedIn, username: username };
  }

  @Get('/movieprofile/:id')
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Render('movieprofile')
  async movie(
    @Res() response: Response,
    @Session() session: SessionContainer,
    @Param('id', ParseIntPipe) id: number,
  ) {
    if (session !== undefined) {
      username = await this.appService.getUsernameByExternalId(
        session.getUserId(),
      );
      loggedIn = true;

      response.cookie('username', username);
    } else {
      loggedIn = false;
      username = null;
    }

    return this.appService.showMovie(loggedIn, username, id);
  }

  @Get('/playlist/:id')
  @UseGuards(new AuthGuard())
  @Render('listprofile')
  async list(
    @Res() response: Response,
    @Session() session: SessionContainer,
    @Param('id', ParseIntPipe) id: number,
  ) {
    username = await this.appService.getUsernameByExternalId(
      session.getUserId(),
    );
    loggedIn = true;

    response.cookie('username', username);

    return this.appService.showPlaylist(loggedIn, username, id);
  }
}
