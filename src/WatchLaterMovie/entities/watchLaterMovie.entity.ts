import { WatchLaterStatus } from '../enums/watchLaterMovie.enum';

export class WatchLaterMovie {
  id: number;
  watchLaterStatus: WatchLaterStatus;
  movieId: number;
  movieName: string;
}
