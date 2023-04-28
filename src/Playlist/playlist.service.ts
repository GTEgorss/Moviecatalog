import { Injectable, NotFoundException } from '@nestjs/common';
import { PlaylistDto } from './dto/playlist.dto';
import prisma from '../main';
import { PlaylistValidator } from './playlist.validator';

const playlistValidator = new PlaylistValidator();

@Injectable()
export class PlaylistService {
  async createPlaylist(dto: PlaylistDto) {
    await playlistValidator.validate(dto);
    const playlist = await prisma.playlist.create({
      data: {
        title: dto.title,
        private: Boolean(dto.private),
        userId: dto.userId,
      },
    });
    return playlist;
  }

  async getPlaylistsByTitle(title: string) {
    const playlists = await prisma.playlist.findMany({
      where: { title: title },
    });
    return playlists;
  }

  async getPlaylistById(id: number) {
    const playlist = await prisma.playlist.findUnique({ where: { id: id } });

    if (playlist == null) {
      throw new NotFoundException(`There is no playlist id:${id}`);
    }
    return playlist;
  }

  async deletePlaylistById(id: number) {
    await playlistValidator.validatePlaylist(id);

    const playlist = await prisma.playlist.delete({ where: { id: id } });

    return playlist;
  }

  async addMovieToPlaylist(playlistId: number, movieId: number) {
    await playlistValidator.validatePlaylist(playlistId);
    await playlistValidator.validateMovie(movieId);
    await playlistValidator.validateMovieInPlaylist(movieId, playlistId);

    const movieToPlaylist = await prisma.movieToPlaylist.create({
      data: { playlistId: playlistId, movieId: movieId },
    });

    return movieToPlaylist;
  }

  async removeMovieFromPlaylist(playlistId: number, movieId: number) {
    await playlistValidator.validateMovieNotInPlaylist(movieId, playlistId);

    const movieToPlaylist = await prisma.movieToPlaylist.delete({
      where: {
        playlistId_movieId: {
          playlistId: playlistId,
          movieId: movieId,
        },
      },
    });

    return movieToPlaylist;
  }

  async getAllPlaylistMovies(id: number) {
    await playlistValidator.validatePlaylist(id);

    const movies = await prisma.movieToPlaylist.findMany({
      where: { playlistId: id },
    });

    return movies;
  }
}
