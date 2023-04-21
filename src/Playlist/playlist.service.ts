import { Injectable, NotImplementedException } from '@nestjs/common';
import { PlaylistDto } from './dto/playlist.dto';

@Injectable()
export class PlaylistService {
  createPlaylist(dto: PlaylistDto) {
    return null;
  }

  getPlaylistsByTitle(title: string) {
    return null;
  }

  getPlaylistById(id: number) {
    return null;
  }

  deletePlaylistById(id: number) {
    return null;
  }

  addMovieToPlaylist(playlistId: number, movieId: number) {
    return null;
  }

  removeMovieFromPlaylist(playlistId: number, movieId: number) {
    return null;
  }
}
