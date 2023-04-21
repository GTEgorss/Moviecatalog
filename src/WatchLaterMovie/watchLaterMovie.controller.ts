import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { WatchLaterMovieService } from './watchLaterMovie.service';
import { WatchLaterMovieDto } from './dto/watchLaterMovie.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WatchLaterStatus } from './enums/watchLaterMovie.enum';

@ApiTags('WatchLaterMovie')
@Controller('watchlatermovie')
export class WatchLaterMovieController {
  constructor(
    private readonly watchLaterMovieService: WatchLaterMovieService,
  ) {}

  @ApiOperation({ summary: 'create watch later movie object' })
  @ApiResponse({
    status: 201,
    description: 'Watch later movie created successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiQuery({ name: 'status', enum: WatchLaterStatus })
  @Post('create')
  createWatchLaterMovie(@Body() dto: WatchLaterMovieDto) {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'get watch later movie object by id' })
  @ApiResponse({
    status: 200,
    description: 'Watch later movie provided successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get('id/:id')
  getWatchLaterMovieById(@Param('id') id: number) {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'delete watch later movie object by id' })
  @ApiResponse({
    status: 200,
    description: 'Watch later movie delete succesfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete('id/:id')
  deleteWatchLaterMovieById(@Param('id') id: number) {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'change status for a certain watch later movie object',
  })
  @ApiResponse({
    status: 200,
    description: 'Watch later status changed successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiQuery({ name: 'status', enum: WatchLaterStatus })
  @Patch('changestatus/:watchlatermovieid/:status')
  changeWatchLaterStatus(
    @Param('watchlatermovieid') watchLaterMovieId: number,
    @Param('status') status: string,
  ) {
    throw new NotImplementedException();
  }
}
