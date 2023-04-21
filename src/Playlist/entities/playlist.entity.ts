import { IPlaylist } from '../playlist.interface';

export class Playlist implements IPlaylist {
  id: number;
  title: string;
  private: boolean;
  userId: number;
  movieIds: number[];
  // movieNames: string[]; // TODO decide later
}
