import { PlaylistDto } from './dto/playlist.dto';
import prisma from '../main';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class PlaylistValidator {
  async validate(dto: PlaylistDto) {
    if (Number(await prisma.user.count({ where: { id: dto.userId } })) == 0) {
      throw new BadRequestException(
        `Bad request. There is no user with id:${dto.userId}`,
      );
    }

    if (
      Number(
        await prisma.playlist.count({
          where: { title: dto.title, userId: dto.userId },
        }),
      ) != 0
    ) {
      throw new BadRequestException(
        'You already have playlist with the same title',
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
      throw new NotFoundException('There is no such playlist');
    }
  }

  async validatePlaylistMovie(playlistId: number, movieId: number) {
    await this.validatePlaylist(playlistId);

    if (
      Number(
        await prisma.movie.count({
          where: { id: movieId },
        }),
      ) == 0
    ) {
      throw new NotFoundException('There is no such movie');
    }
  }
}
