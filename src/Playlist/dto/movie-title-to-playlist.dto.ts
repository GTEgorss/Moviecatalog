import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class MovieTitleToPlaylistDto {
  @ApiProperty()
  @IsNumber()
  playlistId: number;
  @ApiProperty()
  @IsNumber()
  movieId: number;
  @ApiProperty()
  movieTitle: string;
}
