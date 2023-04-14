import { Module } from '@nestjs/common';
import { WatchLaterMovieController } from './watchLaterMovie.controller';
import { WatchLaterMovieService } from './watchLaterMovie.service';

@Module({
  controllers: [WatchLaterMovieController],
  providers: [WatchLaterMovieService],
})
export class WatchLaterMovieModule {}
