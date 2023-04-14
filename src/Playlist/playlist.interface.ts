interface IPlaylist {
  id: number;
  title: string;
  private: boolean;
  userId: number;
  movieIds: number[]; //TODO better way?
}
