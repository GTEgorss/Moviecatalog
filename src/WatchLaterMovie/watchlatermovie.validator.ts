import prisma from '../main';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { WatchLaterMovieUserIDDto } from './dto/watchlatermovie-userid.dto';
import { WatchLaterMovieUsernameDto } from './dto/watchlatermovie-username.dto';

export class WatchLaterMovieValidator {
  async validateBodyWithUserID(dto: WatchLaterMovieUserIDDto) {
    await this.validateUserID(dto.userId);
    await this.validateMovie(dto.movieId);
    await this.validateWatchLaterMovieAlreadyExists(dto.userId, dto.movieId);
  }

  async validateBodyWithUsername(dto: WatchLaterMovieUsernameDto) {
    await this.validateUsername(dto.username);
    await this.validateMovie(dto.movieId);
  }

  async validateWatchLaterMovieAlreadyExists(userId, movieId) {
    if (
      Number(
        await prisma.watchLaterMovie.count({
          where: { userId: userId, movieId: movieId },
        }),
      ) != 0
    ) {
      throw new BadRequestException(
        `Watch later movieId:${movieId} userId:${userId} already exists`,
      );
    }
  }

  async validateUserID(userId: number) {
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

  async validateUsername(username: string) {
    if (
      Number(
        await prisma.user.count({
          where: {
            username: username,
          },
        }),
      ) == 0
    ) {
      throw new NotFoundException(`There is no user with username:${username}`);
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
