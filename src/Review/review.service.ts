import { Injectable, NotImplementedException } from '@nestjs/common';
import { ReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
  createReview(dto: ReviewDto) {
    throw new NotImplementedException();
  }

  getReviewById(id: number) {
    throw new NotImplementedException();
  }

  deleteReviewById(id: number) {
    throw new NotImplementedException();
  }
}
