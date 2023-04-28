import { Injectable, NotFoundException } from '@nestjs/common';
import { WatchLaterMovieDto } from './dto/watchLaterMovie.dto';
import { WatchLaterStatus } from '@prisma/client';
import prisma from '../main';
import { WatchLaterMovieValidator } from './watchlatermovie.validator';

const watchLaterMovieValidator = new WatchLaterMovieValidator();

@Injectable()
export class WatchLaterMovieService {
  async createWatchLaterMovie(dto: WatchLaterMovieDto) {
    await watchLaterMovieValidator.validate(dto);
    const watchLaterMovie = await prisma.watchLaterMovie.create({
      data: {
        userId: dto.userId,
        movieId: dto.movieId,
        watchLaterStatus: dto.watchLaterStatus,
      },
    });

    return watchLaterMovie;
  }

  async getWatchLaterMovieById(id: number) {
    const watchLaterMovie = await prisma.watchLaterMovie.findUnique({
      where: { id: Number(id) },
    });

    if (watchLaterMovie == null) {
      throw new NotFoundException(`There is no watch later movie id:${id}`);
    }

    return watchLaterMovie;
  }

  async getWatchLaterMoviesByUserId(id: number) {
    const watchLaterMovies = await prisma.watchLaterMovie.findMany({
      where: { userId: Number(id) },
    });
    return watchLaterMovies;
  }

  async deleteWatchLaterMovieById(id: number) {
    const watchLaterMovie = await prisma.watchLaterMovie.delete({
      where: { id: Number(id) },
    });

    if (watchLaterMovie == null) {
      throw new NotFoundException(`There is no watch later movie id:${id}`);
    }

    return watchLaterMovie;
  }

  async changeWatchLaterStatus(id: number, status: string) {
    await watchLaterMovieValidator.validateWatchLaterMovie(id);

    console.log(id);

    status =
      status === 'WATCHED'
        ? WatchLaterStatus.WATCHED
        : WatchLaterStatus.NOT_WATCHED;

    const watchLaterMovie = await prisma.watchLaterMovie.update({
      where: { id: Number(id) },
      data: { watchLaterStatus: status as WatchLaterStatus },
    });

    return watchLaterMovie;
  }
}
