import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WatchLaterMovieService } from './watchLaterMovie.service';
import { WatchLaterMovieUserIDDto } from './dto/watchlatermovie-userid.dto';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { WatchLaterStatus } from '@prisma/client';
import { WatchLaterMovieUsernameDto } from './dto/watchlatermovie-username.dto';
import { WatchLaterMovieTitleDto } from './dto/watchlatermovie-movietitle.dto';

@ApiTags('WatchLaterMovie')
@ApiCookieAuth('JWT')
@Controller('watchlatermovie')
export class WatchLaterMovieController {
  constructor(
    private readonly watchLaterMovieService: WatchLaterMovieService,
  ) {}

  @ApiOperation({ summary: 'create watch later movie object using user ID' })
  @ApiResponse({
    status: 201,
    description: 'Watch later movie created successfully',
    schema: {
      $ref: getSchemaPath(WatchLaterMovieUserIDDto),
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiQuery({ name: 'status', enum: WatchLaterStatus })
  @Post('create/userid')
  createWatchLaterMovieUserID(
    @Body() dto: WatchLaterMovieUserIDDto,
  ): Promise<WatchLaterMovieTitleDto> {
    return this.watchLaterMovieService.createWatchLaterMovieUserID(dto);
  }

  @ApiOperation({ summary: 'create watch later movie object using username' })
  @ApiResponse({
    status: 201,
    description: 'Watch later movie created successfully',
    schema: {
      $ref: getSchemaPath(WatchLaterMovieUsernameDto),
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiQuery({ name: 'status', enum: WatchLaterStatus })
  @Post('create/username')
  createWatchLaterMovieUsername(
    @Body() dto: WatchLaterMovieUsernameDto,
  ): Promise<WatchLaterMovieTitleDto> {
    return this.watchLaterMovieService.createWatchLaterMovieUsername(dto);
  }

  @ApiOperation({ summary: 'get watch later movie object by id' })
  @ApiResponse({
    status: 200,
    description: 'Watch later movie provided successfully',
    type: WatchLaterMovieTitleDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Get('id/:id')
  getWatchLaterMovieById(
    @Param('id') id: number,
  ): Promise<WatchLaterMovieTitleDto> {
    return this.watchLaterMovieService.getWatchLaterMovieById(id);
  }

  @ApiOperation({ summary: 'get watch later movie objects by user id' })
  @ApiResponse({
    status: 200,
    description: 'Watch later movie provided successfully',
    type: WatchLaterMovieTitleDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Get('userid/:id')
  getWatchLaterMovieByUserId(
    @Param('id') id: number,
  ): Promise<WatchLaterMovieTitleDto[]> {
    return this.watchLaterMovieService.getWatchLaterMoviesByUserId(id);
  }

  @ApiOperation({ summary: 'delete watch later movie object by id' })
  @ApiResponse({
    status: 200,
    description: 'Watch later movie delete succesfully',
    type: WatchLaterMovieTitleDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Delete('id/:id')
  deleteWatchLaterMovieById(
    @Param('id') id: number,
  ): Promise<WatchLaterMovieTitleDto> {
    return this.watchLaterMovieService.deleteWatchLaterMovieById(id);
  }

  @ApiOperation({
    summary: 'change status for a certain watch later movie object',
  })
  @ApiResponse({
    status: 200,
    description: 'Watch later status changed successfully',
    type: WatchLaterMovieTitleDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiParam({ name: 'status', enum: WatchLaterStatus })
  @Patch('changestatus/:watchlatermovieid/:status')
  changeWatchLaterStatus(
    @Param('watchlatermovieid') id: number,
    @Param('status') status: string,
  ): Promise<WatchLaterMovieTitleDto> {
    return this.watchLaterMovieService.changeWatchLaterStatus(id, status);
  }
}
