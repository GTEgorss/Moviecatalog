import { Injectable } from '@nestjs/common';
import prisma from './main';

@Injectable()
export class AppService {
  async showMovie(loggedIn: boolean, username: string, id: number) {
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
}
