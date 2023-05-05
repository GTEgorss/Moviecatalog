import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistDto } from './dto/playlist.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { MovieToPlaylistDto } from './dto/movie-to-playlist.dto';
import { PlaylistUsernameDto } from './dto/playlist-username.dto';
import { MovieTitleToPlaylistDto } from './dto/movie-title-to-playlist.dto';

@ApiTags('Playlist')
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @ApiOperation({ summary: 'create playlist' })
  @ApiResponse({
    status: 201,
    description: 'Playlists created successfully',
    schema: { $ref: getSchemaPath(PlaylistUsernameDto) },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('create')
  async createPlaylist(@Body() dto: PlaylistUsernameDto): Promise<PlaylistDto> {
    return this.playlistService.createPlaylist(dto);
  }

  @ApiOperation({ summary: 'get all playlists by title' })
  @ApiResponse({
    status: 200,
    description: 'Playlists provided successfully',
    type: PlaylistDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Get('title/:title')
  async getPlaylistsByTitle(
    @Param('title') title: string,
  ): Promise<PlaylistDto[]> {
    return this.playlistService.getPlaylistsByTitle(title);
  }

  @ApiOperation({ summary: 'get playlist by id' })
  @ApiResponse({
    status: 200,
    description: 'Playlist provided successfully',
    type: PlaylistDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Get('id/:id')
  async getPlaylistById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PlaylistDto> {
    return this.playlistService.getPlaylistById(id);
  }

  @ApiOperation({ summary: 'delete playlist by id' })
  @ApiResponse({
    status: 200,
    description: 'Playlist deleted succesfully',
    type: PlaylistDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Delete('id/:id')
  async deletePlaylistById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PlaylistDto> {
    return this.playlistService.deletePlaylistById(id);
  }

  @ApiOperation({ summary: 'add movie to playlist' })
  @ApiResponse({
    status: 200,
    description: 'Movie added successfully',
    schema: { $ref: getSchemaPath(MovieToPlaylistDto) },
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Post('addmovie/:playlistid/:movieid')
  addMovieToPlaylist(
    @Param('playlistid', ParseIntPipe) playlistId: number,
    @Param('movieid', ParseIntPipe) movieId: number,
  ): Promise<MovieToPlaylistDto> {
    return this.playlistService.addMovieToPlaylist(playlistId, movieId);
  }

  @ApiOperation({ summary: 'remove movie from playlist' })
  @ApiResponse({
    status: 200,
    description: 'Movie removed successfully',
    type: MovieTitleToPlaylistDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Delete('removemovie/:playlistid/:movieid')
  removeMovieFromPlaylist(
    @Param('playlistid', ParseIntPipe) playlistId: number,
    @Param('movieid', ParseIntPipe) movieId: number,
  ) {
    return this.playlistService.removeMovieFromPlaylist(playlistId, movieId);
  }

  @ApiOperation({ summary: 'get all movies in a playlist' })
  @ApiResponse({
    status: 200,
    description: 'Movies provided successfully',
    type: MovieTitleToPlaylistDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Get('list/:playlistid/')
  getAllPlaylistMovies(
    @Param('playlistid', ParseIntPipe) id: number,
  ): Promise<MovieTitleToPlaylistDto[]> {
    return this.playlistService.getAllPlaylistMovies(id);
  }
}
