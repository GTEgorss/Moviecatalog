import { ApiProperty } from '@nestjs/swagger';
import { WatchLaterStatus } from '../enums/watchLaterMovie.enum';

export class WatchLaterMovieDto {
  @ApiProperty({ enum: ['WATCHED', 'NOT_WATCHED'] })
  watchLaterStatus: WatchLaterStatus;
  @ApiProperty()
  movieId: number;
  @ApiProperty()
  movieName: string;
}
