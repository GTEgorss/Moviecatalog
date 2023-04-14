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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('WatchLaterMovie')
@Controller('watchlatermovie')
export class WatchLaterMovieController {
  constructor(
    private readonly watchLaterMovieService: WatchLaterMovieService,
  ) {}

  @ApiOperation({ summary: 'create watch later movie object' })
  @Post('create')
  createWatchLaterMovie(@Body() dto: WatchLaterMovieDto) {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'get watch later movie object by id' })
  @Get('get/id/:id')
  getWatchLaterMovieById(@Param('id') id: number) {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'delete watch later movie object by id' })
  @Delete('delete/id/:id')
  deleteWatchLaterMovieById(@Param('id') id: number) {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'change status for a certain watch later movie object',
  })
  @Patch('changestatus/:watchlatermovieid/:status')
  changeWatchLaterStatus(
    @Param('watchlatermovieid') watchLaterMovieId: number,
    @Param('status') status: string,
  ) {
    throw new NotImplementedException();
  }
}
