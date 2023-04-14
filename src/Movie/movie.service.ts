import { Injectable, NotImplementedException } from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
  createMovie(dto: MovieDto) {
    throw new NotImplementedException();
  }

  getMovieByTitle(title: string) {
    throw new NotImplementedException();
  }

  getMovieById(id: number) {
    throw new NotImplementedException();
  }

  deleteMovieByTitle(title: string) {
    throw new NotImplementedException();
  }

  deleteMovieById(id: number) {
    throw new NotImplementedException();
  }
}
