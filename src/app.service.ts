import { Injectable } from '@nestjs/common';
import prisma from './main';
import { MovieValidator } from './Movie/movie.validator';
import { PlaylistValidator } from './Playlist/playlist.validator';

@Injectable()
export class AppService {
  movieValidator = new MovieValidator();
  playlistValidator = new PlaylistValidator();

  async getUsernameByExternalId(externalId: string) {
    try {
      const userId = await prisma.userIdToExternalId.findFirst({
        where: { externalId: externalId },
        select: {
          userId: true,
        },
      });

      const user = await prisma.user.findUnique({
        where: {
          id: Number(userId.userId),
        },
        select: {
          username: true,
        },
      });

      return user.username;
    } catch (e) {
      throw e;
    }
  }

  async showMovie(loggedIn: boolean, username: string, id: number) {
    await this.movieValidator.validateMovie(id);

    const movie = await Promise.resolve(
      prisma.movie.findUnique({
        where: {
          id: Number(id),
        },
      }),
    ).then((value) => {
      return value;
    });

    return {
      loggedIn: loggedIn,
      username: username,
      movieId: movie.id,
      title: movie.title,
      year: movie.year,
      country: movie.country,
      genre: movie.genre,
      director: movie.director,
      cast: movie.cast,
      duration: movie.duration,
      age: movie.age,
      isSeasoned: movie.seasons !== null,
      seasons: movie.seasons,
      description: movie.description,
    };
  }

  async showPlaylist(loggedIn: boolean, username: string, id: number) {
    await this.playlistValidator.validatePlaylist(id);

    const playlistTitle = await Promise.resolve(
      prisma.playlist
        .findUnique({
          where: {
            id: Number(id),
          },
          select: { title: true },
        })
        .then((value) => {
          return value.title;
        }),
    );

    const movies = await Promise.resolve(
      prisma.movieToPlaylist
        .findMany({
          where: {
            playlistId: Number(id),
          },
        })
        .then((value) => {
          return value;
        }),
    );

    const empty = movies.length == 0;

    return {
      loggedIn: loggedIn,
      username: username,
      id: id,
      playlistTitle: playlistTitle,
      isEmpty: empty,
      movies: movies,
    };
  }
}
