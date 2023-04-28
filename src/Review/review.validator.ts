import { ReviewDto } from './dto/review.dto';
import prisma from '../main';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class ReviewValidator {
  async validate(dto: ReviewDto) {
    await this.validateUser(dto.userId);

    await this.validateMovie(dto.movieId);

    if (dto.rating < 0 || dto.rating > 10) {
      throw new BadRequestException(
        'Bad request. Rating has to be between 0 and 10.',
      );
    }
  }

  async validateUser(userId: number) {
    if (Number(await prisma.user.count({ where: { id: userId } })) == 0) {
      throw new NotFoundException(`There is no user with id:${userId}`);
    }
  }

  async validateMovie(movieId: number) {
    if (Number(await prisma.movie.count({ where: { id: movieId } })) == 0) {
      throw new NotFoundException(`There is no movie with id:${movieId}`);
    }
  }

  async validateReview(id: number) {
    if (Number(await prisma.review.count({ where: { id: id } })) == 0) {
      throw new NotFoundException(`There is no review id:${id}`);
    }
  }
}
