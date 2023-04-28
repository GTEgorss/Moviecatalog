import { UserDto } from './dto/user.dto';
import prisma from '../main';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class UserValidator {
  async validate(dto: UserDto) {
    if (
      Number(
        await prisma.user.count({
          where: {
            username: dto.username,
          },
        }),
      ) != 0
    ) {
      throw new BadRequestException(
        `User with username:${dto.username} already exists`,
      );
    }

    if (
      Number(
        await prisma.user.count({
          where: {
            email: dto.email,
          },
        }),
      ) != 0
    ) {
      throw new BadRequestException(
        `User with email:${dto.email} already exists`,
      );
    }
  }

  async validateUserById(userId: number) {
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

  async validateUserByUsername(username: string) {
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

  async validateUserByEmail(email: string) {
    if (
      Number(
        await prisma.user.count({
          where: {
            email: email,
          },
        }),
      ) == 0
    ) {
      throw new NotFoundException(`There is no user with email:${email}`);
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

  async validateFavoriteNotExistent(userId: number, movieId: number) {
    if (
      Number(
        await prisma.favorite.count({
          where: {
            userId: userId,
            movieId: movieId,
          },
        }),
      ) != 0
    ) {
      throw new BadRequestException(
        `Favorite userId:${userId} movieId:{movieId} already exists`,
      );
    }
  }

  async validateFavoriteExistent(userId: number, movieId: number) {
    if (
      Number(
        await prisma.favorite.count({
          where: {
            userId: userId,
            movieId: movieId,
          },
        }),
      ) == 0
    ) {
      throw new NotFoundException(
        `There is no favorite userId:${userId} movieId:${movieId}`,
      );
    }
  }
}
