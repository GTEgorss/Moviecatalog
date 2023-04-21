import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt } from 'class-validator';

export class PlaylistDto {
  @ApiProperty()
  title: string;
  @ApiProperty({ description: 'Private or public playlist' })
  @IsBoolean()
  private: boolean;
  @ApiProperty({ description: 'Playlist owner' })
  @IsInt()
  userId: number;
}
