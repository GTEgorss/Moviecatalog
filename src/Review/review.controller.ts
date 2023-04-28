import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from './dto/review.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: 'create review' })
  @ApiResponse({
    status: 201,
    description: 'Review created successfully',
    schema: { $ref: getSchemaPath(ReviewDto) },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('create')
  async createReview(@Body() dto: ReviewDto): Promise<ReviewDto> {
    return this.reviewService.createReview(dto);
  }

  @ApiOperation({ summary: 'get review by id' })
  @ApiResponse({
    status: 200,
    description: 'Review provided successfully',
    type: ReviewDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Get('id/:id')
  async getReviewById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReviewDto> {
    return this.reviewService.getReviewById(id);
  }

  @ApiOperation({ summary: 'delete review by id' })
  @ApiResponse({
    status: 200,
    description: 'Review deleted successfully',
    type: ReviewDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Delete('id/:id')
  async deleteReviewById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReviewDto> {
    return this.reviewService.deleteReviewById(id);
  }

  @ApiOperation({ summary: 'get review by user id' })
  @ApiResponse({
    status: 200,
    description: 'Review provided successfully',
    type: ReviewDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Get('userid/:id')
  async getReviewsByUserId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReviewDto[]> {
    return this.reviewService.getReviewsByUserId(id);
  }

  @ApiOperation({ summary: 'get review by movie id' })
  @ApiResponse({
    status: 200,
    description: 'Review provided successfully',
    type: ReviewDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Get('movieid/:id')
  async getReviewsByMovieId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReviewDto[]> {
    return this.reviewService.getReviewsByMovieId(id);
  }
}
