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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Playlist')
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post('create')
  async createPlaylist(@Body() dto: PlaylistDto): Promise<PlaylistDto> {
    throw new NotImplementedException();
  }

  @Get('get/title/:title')
  async getPlaylistByTitle(
    @Param('title') title: string,
  ): Promise<PlaylistDto> {
    throw new NotImplementedException();
  }

  @Get('get/id/:id')
  async getPlaylistById(@Param('id') id: number): Promise<PlaylistDto> {
    throw new NotImplementedException();
  }

  @Delete('delete/id/:id')
  async deletePlaylistById(@Param('id') id: number): Promise<PlaylistDto> {
    throw new NotImplementedException();
  }

  @Patch('addmovie/playlistid/movieid')
  addMovieToPlaylist(
    @Param('playlistid') playlistId: number,
    @Param('movieid') movieId: number,
  ) {
    throw new NotImplementedException();
  }

  @Patch('removemovie/playlistid/movieid')
  removeMovieFromPlaylist(
    @Param('playlistid') playlistId: number,
    @Param('movieid') movieId: number,
  ) {
    throw new NotImplementedException();
  }
}
