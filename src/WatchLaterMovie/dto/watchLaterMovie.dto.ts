import { ApiProperty } from '@nestjs/swagger';
import { WatchLaterStatus } from '@prisma/client';
import { IsEnum, IsNumber } from 'class-validator';

export class WatchLaterMovieDto {
  @ApiProperty({ enum: ['WATCHED', 'NOT_WATCHED'] })
  @IsEnum(WatchLaterStatus)
  watchLaterStatus: WatchLaterStatus;
  @ApiProperty()
  @IsNumber()
  movieId: number;
  @ApiProperty()
  @IsNumber()
  userId: number;
}
