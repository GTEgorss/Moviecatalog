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

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    MovieModule,
    ReviewModule,
    PlaylistModule,
    WatchLaterMovieModule,
    AuthModule.forRoot({
      // These are the connection details of the app you created on supertokens.com
      connectionURI:
        'https://dev-e230ed21e5d711ed801de9dfa4afff12-eu-west-1.aws.supertokens.io:3571',
      apiKey: 'MITsa18TvjkJFZ1jqiEShaioYbryPc',
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/emailpassword/appinfo
        appName: 'moviecatalog',
        apiDomain: 'http://localhost:2002',
        websiteDomain: 'http://localhost:2002',
        apiBasePath: '/apiauth',
        websiteBasePath: '/auth',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
