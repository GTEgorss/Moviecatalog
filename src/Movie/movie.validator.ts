import { MovieDto } from './dto/movie.dto';
import { BadRequestException } from '@nestjs/common';

export class MovieValidator {
  async validate(dto: MovieDto) {
    if (
      dto.age !== 0 &&
      dto.age !== 6 &&
      dto.age !== 12 &&
      dto.age !== 16 &&
      dto.age !== 18
    ) {
      throw new BadRequestException('Bad request. Wrong age restriction');
    }
  }
}
