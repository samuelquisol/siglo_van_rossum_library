import { IsString, IsNotEmpty, IsInt, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSaleDto {
  @ApiProperty({
    description: 'The name of the customer',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  customer: string;

  @ApiProperty({
    description: 'ID of the book being sold',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  bookId: number;

  @ApiProperty({
    description: 'Date of the sale',
    example: '2024-06-01T14:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  saleDate: string;

  @ApiProperty({
    description: 'Total price of the sale',
    example: 19,
  })
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}
