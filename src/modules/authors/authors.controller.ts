import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new author' })
  @ApiResponse({ status: 201, description: 'The author has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateAuthorDto })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all authors' })
  @ApiResponse({ status: 200, description: 'Return the search results for authors.' })
  @ApiResponse({ status: 400, description: 'Invalid parameters.' })
  @ApiQuery({ name: 'searchTerm', required: false, description: 'The name to search for' })
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
    return this.authorsService.findAll(searchTerm, orderField, orderType, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an author by id' })
  @ApiResponse({ status: 200, description: 'Return a single author.' })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the author to retrieve' })
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an author by id' })
  @ApiResponse({ status: 200, description: 'The author has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  @ApiBody({ type: UpdateAuthorDto })
  @ApiParam({ name: 'id', description: 'The ID of the author to update' })
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an author by id' })
  @ApiResponse({ status: 200, description: 'The author has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the author to delete' })
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }
}
