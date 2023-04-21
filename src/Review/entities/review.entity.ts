import { IReview } from '../review.interface';

export class Review implements IReview {
  id: number;
  rating: number;
  body: string;
  userId: number;
  username: string;
  movieId: number;
  date: Date; //TODO check DateTime from prisma and Date compatibility
}
