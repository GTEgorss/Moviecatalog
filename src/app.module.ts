import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './User/user.module';
import { MovieModule } from './Movie/movie.module';
import { ReviewModule } from './Review/review.module';
import { PlaylistModule } from './Playlist/playlist.module';
import { WatchLaterMovieModule } from './WatchLaterMovie/watchLaterMovie.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    MovieModule,
    ReviewModule,
    PlaylistModule,
    WatchLaterMovieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
