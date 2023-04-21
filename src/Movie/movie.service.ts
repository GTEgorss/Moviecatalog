import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';
import prisma from '../main';
import { MovieValidator } from './movie.validator';

const movieValidator = new MovieValidator();

@Injectable()
export class MovieService {
  async createMovie(dto: MovieDto) {
    await movieValidator.validate(dto);

    const movie = prisma.movie.create({
      data: {
        title: dto.title,
        year: dto.year,
        country: dto.country,
        genre: dto.genre,
        director: dto.director,
        cast: dto.cast,
        duration: Number(dto.duration),
        age: Number(dto.age),
        seasons: dto.seasons,
        description: dto.description,
      },
    });

    return movie;
  }

  async getMoviesByTitle(title: string) {
    const movies = await prisma.movie.findMany({
      where: {
        title: title,
      },
    });

    return movies;
  }

  async getMovieById(id: number) {
    const movie = await prisma.movie.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (movie == null) {
      throw new NotFoundException();
    }
    return movie;
  }

  async deleteMovieById(id: number) {
    try {
      const movie = await prisma.movie.delete({
        where: {
          id: Number(id),
        },
      });
      return movie;
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
