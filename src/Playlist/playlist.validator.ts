import prisma from '../main';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PlaylistUsernameDto } from './dto/playlist-username.dto';

export class PlaylistValidator {
  async validate(dto: PlaylistUsernameDto, userId: number) {
    if (
      Number(
        await prisma.playlist.count({
          where: { title: dto.title, userId: userId },
        }),
      ) != 0
    ) {
      throw new BadRequestException(
        `There is already a playlist with title:${dto.title}`,
      );
    }
  }

  async validateUserByUsername(username: string) {
    if (
      Number(await prisma.user.count({ where: { username: username } })) == 0
    ) {
      throw new BadRequestException(
        `Bad request. There is no user with username:${username}`,
      );
    }
  }

  async validatePlaylist(playlistId: number) {
    if (
      Number(
        await prisma.playlist.count({
          where: { id: playlistId },
        }),
      ) == 0
    ) {
      throw new NotFoundException(`There is no playlist id:${playlistId}`);
    }
  }

  async validateMovie(movieId: number) {
    if (
      Number(
        await prisma.movie.count({
          where: { id: movieId },
        }),
      ) == 0
    ) {
      throw new NotFoundException(`There is no movie id:${movieId}`);
    }
  }

  async validateMovieInPlaylist(movieId: number, playlistId: number) {
    if (
      Number(
        await prisma.movieToPlaylist.count({
          where: { movieId: movieId, playlistId: playlistId },
        }),
      ) > 0
    ) {
      throw new BadRequestException(
        `Movie id:${movieId} is already in playlist id:${playlistId}`,
      );
    }
  }

  async validateMovieNotInPlaylist(movieId: number, playlistId: number) {
    if (
      Number(
        await prisma.movieToPlaylist.count({
          where: { movieId: movieId, playlistId: playlistId },
        }),
      ) == 0
    ) {
      throw new NotFoundException(
        `There is no movie id:${movieId} in playlist id:${playlistId}`,
      );
    }
  }
}
