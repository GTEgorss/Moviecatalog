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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Playlist')
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @ApiOperation({ summary: 'create playlist' })
  @ApiResponse({ status: 201, description: 'Playlists created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('create')
  async createPlaylist(@Body() dto: PlaylistDto): Promise<PlaylistDto> {
    return this.playlistService.createPlaylist(dto);
  }

  @ApiOperation({ summary: 'get review by id' })
  @ApiResponse({ status: 200, description: 'Playlists provided successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get('title/:title')
  async getPlaylistsByTitle(
    @Param('title') title: string,
  ): Promise<PlaylistDto[]> {
    return this.playlistService.getPlaylistsByTitle(title);
  }

  @ApiOperation({ summary: 'get playlist by id' })
  @ApiResponse({ status: 200, description: 'Playlist provided successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get('id/:id')
  async getPlaylistById(@Param('id') id: number): Promise<PlaylistDto> {
    return this.playlistService.getPlaylistById(id);
  }

  @ApiOperation({ summary: 'delete playlist by id' })
  @ApiResponse({ status: 200, description: 'Playlist deleted succesfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete('id/:id')
  async deletePlaylistById(@Param('id') id: number): Promise<PlaylistDto> {
    return this.playlistService.deletePlaylistById(id);
  }

  @ApiOperation({ summary: 'add movie to playlist' })
  @ApiResponse({ status: 200, description: 'Movie added successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Patch('addmovie/playlistid/movieid')
  addMovieToPlaylist(
    @Param('playlistid') playlistId: number,
    @Param('movieid') movieId: number,
  ): Promise<PlaylistDto> {
    return this.playlistService.addMovieToPlaylist(playlistId, movieId);
  }

  @ApiOperation({ summary: 'remove movie from playlist' })
  @ApiResponse({ status: 200, description: 'Movie removed successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Patch('removemovie/playlistid/movieid')
  removeMovieFromPlaylist(
    @Param('playlistid') playlistId: number,
    @Param('movieid') movieId: number,
  ): Promise<PlaylistDto> {
    return this.playlistService.removeMovieFromPlaylist(playlistId, movieId);
  }
}
