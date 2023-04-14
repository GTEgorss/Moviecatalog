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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  async createReview(@Body() dto: ReviewDto): Promise<PlaylistDto> {
    throw new NotImplementedException();
  }

  @Get('get/id/:id')
  async getReviewById(@Param('id') id: number): Promise<PlaylistDto> {
    throw new NotImplementedException();
  }

  @Delete('delete/id/:id')
  async deleteReviewById(@Param('id') id: number): Promise<PlaylistDto> {
    throw new NotImplementedException();
  }
}
