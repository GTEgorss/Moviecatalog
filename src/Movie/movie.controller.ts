import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';
import { MovieService } from './movie.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({ summary: 'create movie' })
  @ApiResponse({
    status: 201,
    description: 'Movie created successfully',
    schema: { $ref: getSchemaPath(MovieDto) },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('create')
  async createMovie(@Body() dto: MovieDto): Promise<MovieDto> {
    return this.movieService.createMovie(dto);
  }

  @ApiOperation({ summary: 'get all movies by title' })
  @ApiResponse({
    status: 200,
    description: 'Movies provided succesfully',
    type: MovieDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get('title/:title')
  async getMoviesByTitle(@Param('title') title: string): Promise<MovieDto[]> {
    return this.movieService.getMoviesByTitle(title);
  }

  @ApiOperation({ summary: 'get movie by id' })
  @ApiResponse({
    status: 200,
    description: 'Movie provided successfully',
    type: MovieDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  @Get('id/:id')
  async getMovieById(@Param('id', ParseIntPipe) id: number): Promise<MovieDto> {
    return this.movieService.getMovieById(id);
  }

  @ApiOperation({ summary: 'delete movie by id' })
  @ApiResponse({
    status: 200,
    description: 'Movie deleted successfully',
    type: MovieDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  @Delete('id/:id')
  async deleteMovieById(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.deleteMovieById(id);
  }
}
