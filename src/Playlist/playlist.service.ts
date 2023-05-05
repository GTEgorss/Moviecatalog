import { Injectable, NotFoundException } from '@nestjs/common';
import prisma from '../main';
import { PlaylistValidator } from './playlist.validator';
import { PlaylistUsernameDto } from './dto/playlist-username.dto';

const playlistValidator = new PlaylistValidator();

@Injectable()
export class PlaylistService {
  async createPlaylist(dto: PlaylistUsernameDto) {
    await playlistValidator.validateUserByUsername(dto.username);

    const id = await Promise.resolve(
      prisma.user
        .findUnique({
          where: {
            username: dto.username,
          },
          select: {
            id: true,
          },
        })
        .then((value) => {
          return value.id;
        }),
    );

    await playlistValidator.validate(dto, id);

    const playlist = await prisma.playlist.create({
      data: {
        title: dto.title,
        private: Boolean(dto.private),
        userId: id,
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
    const playlist = await prisma.playlist.findUnique({
      where: { id: Number(id) },
    });

    if (playlist == null) {
      throw new NotFoundException(`There is no playlist id:${id}`);
    }
    return playlist;
  }

  async deletePlaylistById(id: number) {
    await playlistValidator.validatePlaylist(id);

    await prisma.movieToPlaylist.deleteMany({
      where: {
        playlistId: Number(id),
      },
    });

    const playlist = await prisma.playlist.delete({
      where: { id: Number(id) },
    });

    return playlist;
  }

  async addMovieToPlaylist(playlistId: number, movieId: number) {
    await playlistValidator.validatePlaylist(playlistId);
    await playlistValidator.validateMovie(movieId);
    await playlistValidator.validateMovieInPlaylist(movieId, playlistId);

    const title = await prisma.movie
      .findUnique({
        where: {
          id: Number(movieId),
        },
        select: {
          title: true,
        },
      })
      .then((value) => {
        return value.title;
      });

    const movieToPlaylist = await prisma.movieToPlaylist.create({
      data: { playlistId: playlistId, movieId: movieId, movieTitle: title },
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
      where: { playlistId: Number(id) },
    });

    return movies;
  }
}
