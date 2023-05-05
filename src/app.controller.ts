import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Render,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseTimeInterceptor } from './interceptor';
import { ApiExcludeController } from '@nestjs/swagger';
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';

const loggedIn = true;
const username = 'GTEgorss';

@ApiExcludeController()
@Controller()
@UseInterceptors(ResponseTimeInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

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

  @Get('/watchlater')
  @Render('watchlater')
  watchlater() {
    return { loggedIn: loggedIn, username: username };
  }

  @Get('/search')
  @Render('search')
  search() {
    return { loggedIn: loggedIn, username: username };
  }

  @Get('/explore')
  @Render('explore')
  explore() {
    return { loggedIn: loggedIn, username: username };
  }

  @Get('/style')
  @Render('style')
  style() {
    return { loggedIn: false, username: username };
  }

  @Get('/signup')
  @Render('signup')
  signup() {
    return { loggedIn: loggedIn, username: username };
  }

  @Get('/login')
  @Render('login')
  login() {
    return { loggedIn: loggedIn, username: username };
  }

  @Get('/createlist')
  @Render('createlist')
  createlist() {
    return { loggedIn: loggedIn, username: username };
  }

  @Get('/movieprofile/:id')
  @Render('movieprofile')
  movie(@Param('id', ParseIntPipe) id: number) {
    return this.appService.showMovie(loggedIn, username, id);
  }

  @Get('/playlist/:id')
  @Render('listprofile')
  list(@Param('id', ParseIntPipe) id: number) {
    return this.appService.showPlaylist(loggedIn, username, id);
  }

  @Get('/test')
  @UseGuards(new AuthGuard())
  test(@Session() session: SessionContainer) {
    if (session !== undefined) {
      const userId = session.getUserId();
    } else {
    }
    return 'magic';
  }
}
