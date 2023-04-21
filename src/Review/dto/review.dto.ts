import { ApiProperty } from '@nestjs/swagger';

export class ReviewDto {
  @ApiProperty()
  rating: number;
  @ApiProperty()
  body: string;
  @ApiProperty({ description: 'Review author' })
  userId: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  movieId: number;
  date: Date; //TODO check DateTime from prisma and Date compatibility
}
