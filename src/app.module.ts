import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './User/user.module';
import { MovieModule } from './Movie/movie.module';
import { ReviewModule } from './Review/review.module';
import { PlaylistModule } from './Playlist/playlist.module';
import { WatchLaterMovieModule } from './WatchLaterMovie/watchLaterMovie.module';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './gateway/app.gateway';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    MovieModule,
    ReviewModule,
    PlaylistModule,
    WatchLaterMovieModule,
    AuthModule.forRoot({
      connectionURI: process.env.AUTH_URI,
      apiKey: process.env.AUTH_APIKEY,
      appInfo: {
        appName: 'moviecatalog',
        apiDomain: process.env.URL,
        websiteDomain: process.env.URL,
        apiBasePath: '/apiauth',
        websiteBasePath: '/auth',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
