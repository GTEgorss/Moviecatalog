export class Playlist implements IPlaylist {
  id: number;
  title: string;
  private: boolean;
  userId: number;
  movieIds: number[]; //TODO better way?
}
