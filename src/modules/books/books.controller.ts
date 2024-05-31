import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'The book has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateBookDto })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Return the search results for books.' })
  @ApiResponse({ status: 400, description: 'Invalid parameters.' })
  @ApiQuery({ name: 'searchTerm', required: false, description: 'The title to search for' })
  @ApiQuery({ name: 'orderField', required: false, description: 'The field to order by' })
  @ApiQuery({ name: 'orderType', required: false, enum: ['ASC', 'DESC'], description: 'The order type (ASC or DESC)' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'The page number for pagination' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'The number of results per page' })
  findAll(
    @Query('searchTerm') searchTerm: string,
    @Query('orderField') orderField: string = 'id',
    @Query('orderType') orderType: 'ASC' | 'DESC' = 'ASC',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.booksService.findAll(searchTerm, orderField, orderType, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by id' })
  @ApiResponse({ status: 200, description: 'Return a single book.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the book to retrieve' })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a book by id' })
  @ApiResponse({ status: 200, description: 'The book has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  @ApiBody({ type: CreateBookDto })
  @ApiParam({ name: 'id', description: 'The ID of the book to update' })
  update(@Param('id') id: string, @Body() updateBookDto: CreateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by id' })
  @ApiResponse({ status: 200, description: 'The book has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the book to delete' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
