export class ReviewDto {
  rating: number;
  body: string;
  date: Date; //TODO check DateTime from prisma and Date compatibility
  userId: number; //TODO better way?
  movieId: number; //TODO better way?
}