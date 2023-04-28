import prisma from '../main';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { WatchLaterMovieDto } from './dto/watchLaterMovie.dto';

export class WatchLaterMovieValidator {
  async validate(dto: WatchLaterMovieDto) {
    await this.validateUser(dto.userId);
    await this.validateMovie(dto.movieId);

    if (
      Number(
        await prisma.watchLaterMovie.count({
          where: { userId: dto.userId, movieId: dto.movieId },
        }),
      ) != 0
    ) {
      throw new BadRequestException(
        `Watch later movieId:${dto.movieId} userId:${dto.userId} already exists`,
      );
    }
  }

  async validateUser(userId: number) {
    if (
      Number(
        await prisma.user.count({
          where: {
            id: userId,
          },
        }),
      ) == 0
    ) {
      throw new NotFoundException(`There is no user with id:${userId}`);
    }
  }

  async validateMovie(movieId: number) {
    if (
      Number(
        await prisma.movie.count({
          where: {
            id: movieId,
          },
        }),
      ) == 0
    ) {
      throw new NotFoundException(`There is no movie with id:${movieId}`);
    }
  }

  async validateWatchLaterMovie(id: number) {
    if (
      Number(
        await prisma.watchLaterMovie.count({
          where: {
            id: Number(id),
          },
        }),
      ) == 0
    ) {
      throw new NotFoundException(
        `There is no watch later movie with id:${id}`,
      );
    }
  }
}
