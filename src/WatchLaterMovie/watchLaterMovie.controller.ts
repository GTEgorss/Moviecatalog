import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WatchLaterMovieService } from './watchLaterMovie.service';
import { WatchLaterMovieDto } from './dto/watchLaterMovie.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('WatchLaterMovie')
@Controller('watchlatermovie')
export class WatchLaterMovieController {
  constructor(
    private readonly watchLaterMovieService: WatchLaterMovieService,
  ) {}

  @Post('create')
  createWatchLaterMovie(@Body() dto: WatchLaterMovieDto) {
    throw new NotImplementedException();
  }

  @Get('get/id/:id')
  getWatchLaterMovieById(@Param('id') id: number) {
    throw new NotImplementedException();
  }

  @Delete('delete/id/:id')
  deleteWatchLaterMovieById(@Param('id') id: number) {
    throw new NotImplementedException();
  }

  @Patch('changestatus/:watchlatermovieid/:status')
  changeWatchLaterStatus(
    @Param('watchlatermovieid') watchLaterMovieId: number,
    @Param('status') status: string,
  ) {
    throw new NotImplementedException();
  }
}
