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
import { PlaylistService } from './playlist.service';
import { create } from 'express-handlebars';
import { PlaylistDto } from './dto/playlist.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Playlist')
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @ApiOperation({ summary: 'create playlist' })
  @Post('create')
  async createPlaylist(@Body() dto: PlaylistDto): Promise<PlaylistDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'get review by id' })
  @Get('get/title/:title')
  async getPlaylistsByTitle(
    @Param('title') title: string,
  ): Promise<PlaylistDto[]> {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'get playlist by id' })
  @Get('get/id/:id')
  async getPlaylistById(@Param('id') id: number): Promise<PlaylistDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'delete playlist by id' })
  @Delete('delete/id/:id')
  async deletePlaylistById(@Param('id') id: number): Promise<PlaylistDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'add movie to playlist' })
  @Patch('addmovie/playlistid/movieid')
  addMovieToPlaylist(
    @Param('playlistid') playlistId: number,
    @Param('movieid') movieId: number,
  ) {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'remove movie from playlist' })
  @Patch('removemovie/playlistid/movieid')
  removeMovieFromPlaylist(
    @Param('playlistid') playlistId: number,
    @Param('movieid') movieId: number,
  ) {
    throw new NotImplementedException();
  }
}
