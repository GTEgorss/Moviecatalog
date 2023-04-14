import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
