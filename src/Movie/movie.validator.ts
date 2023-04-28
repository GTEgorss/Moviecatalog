import { MovieDto } from './dto/movie.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import prisma from '../main';

export class MovieValidator {
  async validate(dto: MovieDto) {
    if (dto.age < 0 || dto.age > 18) {
      throw new BadRequestException(
        'Wrong age restriction. Has to be between 0 and 18',
      );
    }
  }

  async validateMovie(id: number) {
    if (Number(await prisma.movie.count({ where: { id: id } })) == 0) {
      throw new NotFoundException(`There is no movie id:${id}`);
    }
  }
}
