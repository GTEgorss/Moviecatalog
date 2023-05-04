import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class PlaylistUsernameDto {
  @ApiProperty()
  title: string;
  @ApiProperty({ description: 'Private or public playlist' })
  @IsBoolean()
  private: boolean;
  @ApiProperty({ description: 'Playlist owner' })
  username: string;
}
