import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FavoriteDto {
  @ApiProperty()
  @IsNumber()
  userId: number;
  @ApiProperty()
  @IsNumber()
  movieId: number;
}
