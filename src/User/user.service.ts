import { UserDto } from './dto/user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import prisma from '../main';
import { Role } from '@prisma/client';
import { UserValidator } from './user.validator';

const userValidator = new UserValidator();

@Injectable()
export class UserService {
  async createUser(dto: UserDto): Promise<UserDto> {
    await userValidator.validate(dto);

    const user = await prisma.user.create({
      data: {
        username: dto.username,
        password: dto.password,
        email: dto.email,
        fullName: dto.fullName,
        role: Role.USER,
      },
    });

    return user;
  }

  async getUserByUsername(username: string): Promise<UserDto> {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (user == null) {
      throw new NotFoundException();
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user == null) {
      throw new NotFoundException();
    }
    return user;
  }

  async getUserById(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (user == null) {
      throw new NotFoundException();
    }
    return user;
  }

  async deleteUserByUsername(username: string) {
    try {
      const user = await prisma.user.delete({
        where: {
          username: username,
        },
      });
      return user;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async deleteUserByEmail(email: string) {
    try {
      const user = await prisma.user.delete({
        where: {
          email: email,
        },
      });
      return user;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async deleteUserById(id: number) {
    try {
      const user = await prisma.user.delete({
        where: {
          id: Number(id),
        },
      });
      return user;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async addFavorite(userId: number, movieId: number) {
    await userValidator.validateUser(userId);
    await userValidator.validateMovie(movieId);
    await userValidator.validateFavorite(userId, movieId);

    const favorite = prisma.favorite.create({
      data: { userId: userId, movieId: movieId },
    });

    return favorite;
  }

  async getFavorites(userId: number) {
    await userValidator.validateUser(userId);

    const favorites = prisma.favorite.findMany({ where: { userId: userId } });
    return favorites;
  }

  async removeFavorite(userId: number, movieId: number) {
    await userValidator.validateUser(userId);
    await userValidator.validateMovie(movieId);

    const favorite = prisma.favorite.deleteMany({
      where: { userId: userId, movieId: movieId },
    });

    return favorite;
  }
}
