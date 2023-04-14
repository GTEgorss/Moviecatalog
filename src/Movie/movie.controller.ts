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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({ summary: 'create movie' })
  @Post('create')
  async createMovie(@Body() dto: MovieDto): Promise<MovieDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'get all movies by title' })
  @Get('get/title/:title')
  async getMoviesByTitle(@Param('title') title: string): Promise<MovieDto[]> {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'get movie by id' })
  @Get('get/id/:id')
  async getMovieById(@Param('id') id: number): Promise<MovieDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'delete movie by id' })
  @Delete('delete/id/:id')
  async deleteMovieById(@Param('id') id: number): Promise<MovieDto> {
    throw new NotImplementedException();
  }
}
