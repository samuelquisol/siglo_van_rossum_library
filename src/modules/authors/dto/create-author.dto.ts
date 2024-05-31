import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({
    description: 'The name of the author',
    example: 'Gabriel Garcia Marquez',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Biography of the author',
    example: 'Gabriel García Márquez was a Colombian novelist, short-story writer, screenwriter, and journalist.',
  })
  @IsString()
  @IsNotEmpty()
  biography: string;

/*   @ApiProperty({
    description: 'List of book IDs associated with the author',
    example: [1, 2, 3],
  })
  @IsArray()
  @IsNotEmpty()
  books: number[];
 */

}
