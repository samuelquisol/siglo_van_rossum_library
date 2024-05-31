import { IsString, IsNotEmpty, IsArray, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    description: 'The title of the book',
    example: 'One Hundred Years of Solitude',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The genre of the book',
    example: 'Magical Realism',
  })
  @IsString()
  @IsNotEmpty()
  genre: string;

  @ApiProperty({
    description: 'The year the book was published',
    example: 1967,
  })
  @IsNumber()
  @IsNotEmpty()
  publicationYear: number;

  @ApiProperty({
    description: 'The ISBN of the book',
    example: '978-3-16-148410-0',
  })
  @IsString()
  @IsNotEmpty()
  isbn: string;

  @ApiProperty({
    description: 'The synopsis of the book',
    example: 'One Hundred Years of Solitude tells the story of the Buendía family...',
  })
  @IsString()
  @IsOptional()
  synopsis?: string;

  @ApiProperty({
    description: 'List of author IDs associated with the book',
    example: [1, 2],
  })
  @IsArray()
  @IsNotEmpty()
  authorIds: number[];
}
