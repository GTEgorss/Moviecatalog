import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class MovieToPlaylistDto {
  @ApiProperty()
  @IsNumber()
  playlistId: number;
  @ApiProperty()
  @IsNumber()
  movieId: number;
}
