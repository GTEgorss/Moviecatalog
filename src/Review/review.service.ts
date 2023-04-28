import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewDto } from './dto/review.dto';
import { ReviewValidator } from './review.validator';
import prisma from '../main';

const reviewValidator = new ReviewValidator();

@Injectable()
export class ReviewService {
  async createReview(dto: ReviewDto) {
    await reviewValidator.validate(dto);
    const review = await prisma.review.create({
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
    const review = await prisma.review.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (review == null) {
      throw new NotFoundException(`There is no review with id:${id}`);
    }
    return review;
  }

  async deleteReviewById(id: number) {
    await reviewValidator.validateReview(id);

    const review = await prisma.review.delete({ where: { id: id } });

    if (review == null) {
      throw new NotFoundException(`There is no review id:${id}`);
    }

    return review;
  }

  async getReviewsByUserId(id: number) {
    await reviewValidator.validateUser(id);

    const reviews = await prisma.review.findMany({ where: { userId: id } });
    return reviews;
  }

  async getReviewsByMovieId(id: number) {
    await reviewValidator.validateMovie(id);

    const reviews = await prisma.review.findMany({ where: { movieId: id } });
    return reviews;
  }
}
