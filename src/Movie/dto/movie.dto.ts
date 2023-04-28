import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';

export class MovieDto {
  @ApiProperty({ example: 'Star Wars: Episode III – Revenge of the Sith' })
  @IsNotEmpty()
  title: string;
  @ApiProperty({ description: 'year of release', example: 2005 })
  @IsNotEmpty()
  year: number;
  @ApiProperty({ description: 'country of production', example: 'USA' })
  @IsNotEmpty()
  country: string;
  @ApiProperty({ example: 'Space opera' })
  @IsNotEmpty()
  genre: string; //TODO diff array
  @ApiProperty({ example: 'Geaorge Lucas' })
  @IsNotEmpty()
  director: string; //TODO diff type
  @ApiProperty({
    example:
      'Ewan McGregor, Natalie Portman, Hayden Christensen, Samuel L. Jackson, Christopher Lee',
  })
  @IsNotEmpty()
  cast: string; //TODO diff type
  @ApiProperty({ description: 'Duration in minutes', example: 140 })
  @IsInt()
  duration: number; //minutes
  @ApiProperty({ description: 'Age restriction', example: 15 })
  @IsInt()
  age: number; // "age+"
  @ApiProperty({
    description: 'Number of seasons. Can be omitted',
    example: null,
  })
  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  seasons: number | null;
  @ApiProperty({
    example:
      'Three years into the Clone Wars, Obi-Wan pursues a new threat, while Anakin is lured by Chancellor Palpatine into a sinister plot to rule the galaxy.',
  })
  description: string;
}
