import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FavoriteNameDto {
  @ApiProperty()
  @IsNumber()
  userId: number;
  @ApiProperty()
  @IsNumber()
  movieId: number;

  @ApiProperty({ example: 'Star Wars: Episode III – Revenge of the Sith' })
  movieName: string;
}
