import { Injectable, NotImplementedException } from '@nestjs/common';
import { WatchLaterMovieDto } from './dto/watchLaterMovie.dto';

@Injectable()
export class WatchLaterMovieService {
  createWatchLaterMovie(dto: WatchLaterMovieDto) {
    throw new NotImplementedException();
  }

  getWatchLaterMovieById(id: number) {
    throw new NotImplementedException();
  }

  deleteWatchLaterMovieById(id: number) {
    throw new NotImplementedException();
  }

  changeWatchLaterStatus(watchLaterMovieId: number, status: WatchLaterStatus) {
    throw new NotImplementedException();
  }
}
