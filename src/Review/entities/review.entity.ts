export class Review implements IReview {
  id: number;
  rating: number;
  body: string;
  date: Date; //TODO check DateTime from prisma and Date compatibility
  userId: number; //TODO better way?
  movieId: number; //TODO better way?
}
