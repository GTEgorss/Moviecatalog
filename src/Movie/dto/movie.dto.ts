import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';

export class MovieDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @ApiProperty({ description: 'year of release' })
  @IsNotEmpty()
  year: number;
  @ApiProperty({ description: 'country of production' })
  @IsNotEmpty()
  country: string;
  @ApiProperty()
  @IsNotEmpty()
  genre: string; //TODO diff array
  @ApiProperty()
  @IsNotEmpty()
  director: string; //TODO diff type
  @ApiProperty()
  @IsNotEmpty()
  cast: string; //TODO diff type
  @ApiProperty({ description: 'Duration in minutes' })
  @IsInt()
  duration: number; //minutes
  @ApiProperty({ description: 'Age restriction' })
  @IsInt()
  age: number; // "age+"
  @ApiProperty({ description: 'Number of seasons. Can be omitted' })
  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  seasons: number | null;
  @ApiProperty()
  description: string;
}
