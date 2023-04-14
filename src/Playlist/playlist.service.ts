import { Injectable, NotImplementedException } from '@nestjs/common';
import { PlaylistDto } from './dto/playlist.dto';

@Injectable()
export class PlaylistService {
  createPlaylist(dto: PlaylistDto) {
    throw new NotImplementedException();
  }

  getPlaylistsByTitle(title: string) {
    throw new NotImplementedException();
  }

  getPlaylistById(id: number) {
    throw new NotImplementedException();
  }

  deletePlaylistByTitle(title: string) {
    throw new NotImplementedException();
  }

  addMovieToPlaylist(playlistId: number, movieId: number) {
    throw new NotImplementedException();
  }

  removeMovieFromPlaylist(playlistId: number, movieId: number) {
    throw new NotImplementedException();
  }
}
