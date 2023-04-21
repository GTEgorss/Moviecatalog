import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { ReviewDto } from './dto/review.dto';
import { ReviewValidator } from './review.validator';
import prisma from '../main';

const reviewValidator = new ReviewValidator();

@Injectable()
export class ReviewService {
  async createReview(dto: ReviewDto) {
    await reviewValidator.validate(dto);
    const review = prisma.review.create({
      data: {
        rating: dto.rating,
        body: dto.body,
        userId: dto.userId,
        movieId: dto.movieId,
      },
    });

    return review;
  }

  async getReviewById(id: number) {
    const review = prisma.review.findUnique({ where: { id: id } });

    if (review == null) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async deleteReviewById(id: number) {
    const review = prisma.review.delete({ where: { id: id } });

    if (review == null) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async getReviewsByUserId(id: number) {
    await reviewValidator.validateUser(id);

    const reviews = prisma.review.findMany({ where: { userId: id } });
    return reviews;
  }

  async getReviewsByMovieId(id: number) {
    await reviewValidator.validateMovie(id);

    const reviews = prisma.review.findMany({ where: { movieId: id } });
    return reviews;
  }
}
