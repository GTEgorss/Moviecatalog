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
      throw new BadRequestException('User with such username already exists');
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
      throw new BadRequestException('User with such email already exists');
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

  async validateFavorite(userId: number, movieId: number) {
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
      throw new BadRequestException('Such favorite already exists');
    }
  }
}
