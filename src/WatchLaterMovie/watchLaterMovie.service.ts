import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { WatchLaterMovieDto } from './dto/watchLaterMovie.dto';
import { WatchLaterStatus } from '@prisma/client';
import prisma from '../main';
import { WatchLaterMovieValidator } from './watchlatermovie.validator';

const watchLaterMovieValidator = new WatchLaterMovieValidator();

@Injectable()
export class WatchLaterMovieService {
  async createWatchLaterMovie(dto: WatchLaterMovieDto) {
    await watchLaterMovieValidator.validate(dto);
    const watchLaterMovie = prisma.watchLaterMovie.create({
      data: {
        userId: dto.userId,
        movieId: dto.movieId,
        watchLaterStatus: dto.watchLaterStatus,
      },
    });

    return watchLaterMovie;
  }

  getWatchLaterMovieById(id: number) {
    const watchLaterMovie = prisma.watchLaterMovie.findUnique({
      where: { id: id },
    });

    if (watchLaterMovie == null) {
      throw new NotFoundException('Watch later movie not found');
    }

    return watchLaterMovie;
  }

  getWatchLaterMoviesByUserId(id: number) {
    const watchLaterMovies = prisma.watchLaterMovie.findMany({
      where: { userId: id },
    });
    return watchLaterMovies;
  }

  deleteWatchLaterMovieById(id: number) {
    const watchLaterMovie = prisma.watchLaterMovie.delete({
      where: { id: id },
    });

    if (watchLaterMovie == null) {
      throw new NotFoundException('Watch later movie not found');
    }

    return watchLaterMovie;
  }

  async changeWatchLaterStatus(id: number, status: WatchLaterStatus) {
    await watchLaterMovieValidator.validateWatchLaterMovie(id);

    const watchLaterMovie = prisma.watchLaterMovie.update({
      where: { id: id },
      data: { watchLaterStatus: status },
    });

    return watchLaterMovie;
  }
}
