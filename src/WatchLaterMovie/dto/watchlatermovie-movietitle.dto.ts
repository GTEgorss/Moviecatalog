import { ApiProperty } from '@nestjs/swagger';
import { WatchLaterStatus } from '@prisma/client';
import { IsEnum, IsNumber } from 'class-validator';

export class WatchLaterMovieTitleDto {
  @ApiProperty({
    enum: ['NOT_WATCHED', 'WATCHED'],
    example: WatchLaterStatus.NOT_WATCHED,
  })
  @IsEnum(WatchLaterStatus)
  watchLaterStatus: WatchLaterStatus;
  @ApiProperty()
  @IsNumber()
  movieId: number;
  @ApiProperty()
  movieTitle: string;
  @ApiProperty()
  @IsNumber()
  userId: number;
}
