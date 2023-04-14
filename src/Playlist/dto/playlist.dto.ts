export class PlaylistDto {
  title: string;
  private: boolean;
  userId: number;
  movieIds: number[]; //TODO better way?
}
