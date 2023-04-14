import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Post,
} from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';
import { MovieService } from './movie.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('create')
  async createMovie(@Body() dto: MovieDto): Promise<MovieDto> {
    throw new NotImplementedException();
  }

  @Get('get/title/:title')
  async getMovieByTitle(@Param('title') title: string): Promise<MovieDto> {
    throw new NotImplementedException();
  }

  @Get('get/id/:id')
  async getMovieById(@Param('id') id: number): Promise<MovieDto> {
    throw new NotImplementedException();
  }

  @Delete('delete/title/:title')
  async deleteMovieByTitle(@Param('title') title: string): Promise<MovieDto> {
    throw new NotImplementedException();
  }

  @Delete('delete/id/:id')
  async deleteMovieById(@Param('id') id: number): Promise<MovieDto> {
    throw new NotImplementedException();
  }
}
