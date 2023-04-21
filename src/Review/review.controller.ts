import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Post,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from './dto/review.dto';
import { PlaylistDto } from '../Playlist/dto/playlist.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: 'create review' })
  @ApiResponse({ status: 201, description: 'Review created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('create')
  async createReview(@Body() dto: ReviewDto): Promise<PlaylistDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'get review by id' })
  @ApiResponse({ status: 200, description: 'Review provided successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get('id/:id')
  async getReviewById(@Param('id') id: number): Promise<PlaylistDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'delete review by id' })
  @ApiResponse({ status: 200, description: 'Review deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete('id/:id')
  async deleteReviewById(@Param('id') id: number): Promise<PlaylistDto> {
    throw new NotImplementedException();
  }
}
