import { Injectable, NotFoundException } from '@nestjs/common';
import { WatchLaterMovieUserIDDto } from './dto/watchlatermovie-userid.dto';
import { WatchLaterStatus } from '@prisma/client';
import prisma from '../main';
import { WatchLaterMovieValidator } from './watchlatermovie.validator';
import { WatchLaterMovieUsernameDto } from './dto/watchlatermovie-username.dto';

const watchLaterMovieValidator = new WatchLaterMovieValidator();

@Injectable()
export class WatchLaterMovieService {
  async createWatchLaterMovieUserID(dto: WatchLaterMovieUserIDDto) {
    await watchLaterMovieValidator.validateBodyWithUserID(dto);
    const watchLaterMovie = await prisma.watchLaterMovie.create({
      data: {
        userId: dto.userId,
        movieId: dto.movieId,
        movieTitle: await this.getMovieTitleById(dto.movieId),
        watchLaterStatus: dto.watchLaterStatus,
      },
    });

    return watchLaterMovie;
  }

  async createWatchLaterMovieUsername(dto: WatchLaterMovieUsernameDto) {
    await watchLaterMovieValidator.validateBodyWithUsername(dto);

    const userId = await Promise.resolve(
      prisma.user
        .findUnique({ where: { username: dto.username }, select: { id: true } })
        .then((value) => {
          return value.id;
        }),
    );

    const watchLaterMovie = await prisma.watchLaterMovie.create({
      data: {
        userId: Number(userId),
        movieId: dto.movieId,
        movieTitle: await this.getMovieTitleById(dto.movieId),
        watchLaterStatus: dto.watchLaterStatus,
      },
    });

    return watchLaterMovie;
  }

  async getMovieTitleById(movieId: number) {
    const title = await Promise.resolve(
      prisma.movie
        .findUnique({
          where: {
            id: Number(movieId),
          },
          select: { title: true },
        })
        .then((value) => {
          return value.title;
        }),
    );

    return title;
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
