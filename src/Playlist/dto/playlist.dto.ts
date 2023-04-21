import { ApiProperty } from '@nestjs/swagger';

export class PlaylistDto {
  @ApiProperty()
  title: string;
  @ApiProperty({ description: 'Private or public playlist' })
  private: boolean;
  @ApiProperty({ description: 'Playlist owner' })
  userId: number;
}
