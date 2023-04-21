import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber } from "class-validator";

export class ReviewDto {
  @ApiProperty()
  @IsNumber()
  rating: number;
  @ApiProperty()
  body: string;
  @ApiProperty({ description: 'Review author' })
  @IsInt()
  userId: number;
  @ApiProperty()
  @IsInt()
  movieId: number;
  date: Date; //TODO check DateTime from prisma and Date compatibility
}
