import { Injectable, NotFoundException } from '@nestjs/common';
import { PlaylistDto } from './dto/playlist.dto';
import prisma from '../main';
import { PlaylistValidator } from './playlist.validator';
import { Movie } from '../Movie/entities/movie.entity';

const playlistValidator = new PlaylistValidator();

@Injectable()
export class PlaylistService {
  async createPlaylist(dto: PlaylistDto) {
    await playlistValidator.validate(dto);
    const playlist = prisma.playlist.create({
      data: {
        title: dto.title,
        private: Boolean(dto.private),
        userId: dto.userId,
      },
    });
    return playlist;
  }

  async getPlaylistsByTitle(title: string) {
    const playlists = prisma.playlist.findMany({ where: { title: title } });
    return playlists;
  }

  async getPlaylistById(id: number) {
    const playlist = prisma.playlist.findUnique({ where: { id: id } });

    if (playlist == null) {
      throw new NotFoundException('Playlist not found');
    }
    return playlist;
  }

  async deletePlaylistById(id: number) {
    const playlist = prisma.playlist.delete({ where: { id: id } });

    if (playlist == null) {
      throw new NotFoundException('Playlist not found');
    }
    return playlist;
  }

  async addMovieToPlaylist(playlistId: number, movieId: number) {
    await playlistValidator.validatePlaylistMovie(playlistId, movieId);

    const movieToPlaylist = prisma.movieToPlaylist.create({
      data: { playlistId: playlistId, movieId: movieId },
    });

    return movieToPlaylist;
  }

  async removeMovieFromPlaylist(playlistId: number, movieId: number) {
    await playlistValidator.validatePlaylistMovie(playlistId, movieId);

    const movieToPlaylist = prisma.movieToPlaylist.deleteMany({
      where: { playlistId: playlistId, movieId: movieId },
    });

    return movieToPlaylist;
  }

  async getAllPlaylistMovies(id: number) {
    await playlistValidator.validatePlaylist(id);

    const movies = prisma.movieToPlaylist.findMany({
      where: { playlistId: id },
    });

    return movies;
  }
}
