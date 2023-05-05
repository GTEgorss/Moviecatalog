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
      throw new NotFoundException(`There is no user with username:${username}`);
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
      throw new NotFoundException(`There is not user with email:${email}`);
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
      throw new NotFoundException(`There is no user with id:${id}`);
    }
    return user;
  }

  async deleteUserByUsername(username: string) {
    await userValidator.validateUserByUsername(username);

    const user = await prisma.user.delete({
      where: {
        username: username,
      },
    });
    return user;
  }

  async deleteUserByEmail(email: string) {
    await userValidator.validateUserByEmail(email);

    const user = await prisma.user.delete({
      where: {
        email: email,
      },
    });
    return user;
  }

  async deleteUserById(id: number) {
    await userValidator.validateUserById(id);

    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return user;
  }

  async addFavorite(userId: number, movieId: number) {
    await userValidator.validateUserById(userId);
    await userValidator.validateMovie(movieId);
    await userValidator.validateFavoriteNotExistent(userId, movieId);

    const favorite = await prisma.favorite.create({
      data: { userId: userId, movieId: movieId },
    });

    return favorite;
  }

  async getFavorites(userId: number) {
    await userValidator.validateUserById(userId);

    const favorites = await prisma.favorite.findMany({
      where: { userId: userId },
    });
    return favorites;
  }

  async removeFavorite(userId: number, movieId: number) {
    await userValidator.validateFavoriteExistent(userId, movieId);

    const favorite = await prisma.favorite.delete({
      where: {
        userId_movieId: {
          userId: userId,
          movieId: movieId,
        },
      },
    });

    return favorite;
  }

  async getPlaylists(username: string) {
    await userValidator.validateUserByUsername(username);

    const id = await Promise.resolve(
      prisma.user
        .findUnique({
          where: {
            username: username,
          },
          select: {
            id: true,
          },
        })
        .then((value) => {
          return value.id;
        }),
    );

    const playlists = await prisma.playlist.findMany({
      where: {
        userId: Number(id),
      },
    });

    return playlists;
  }
}
