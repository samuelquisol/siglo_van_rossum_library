import { Controller, Get, Post, Body, Param, Query, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';

@ApiTags('sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sale' })
  @ApiResponse({ status: 201, description: 'The sale has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateSaleDto })
  create(@Body() createSaleDto: CreateSaleDto) {
    const saleHour = new Date(createSaleDto.saleDate).getHours();
    if (saleHour >= 18 || saleHour < 6) {
      throw new ForbiddenException('Sales cannot be processed between 6pm and 6am');
    }
    return this.salesService.create(createSaleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sales' })
  @ApiResponse({ status: 200, description: 'Return the search results for sales.' })
  @ApiResponse({ status: 400, description: 'Invalid parameters.' })
  @ApiQuery({ name: 'bookId', required: false, type: Number, description: 'The ID of the book to filter by' })
  @ApiQuery({ name: 'fromDate', required: false, type: String, description: 'The start date to filter from' })
  @ApiQuery({ name: 'orderField', required: false, description: 'The field to order by' })
  @ApiQuery({ name: 'orderType', required: false, enum: ['ASC', 'DESC'], description: 'The order type (ASC or DESC)' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'The page number for pagination' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'The number of results per page' })
  findAll(
    @Query('bookId') bookId: number,
    @Query('fromDate') fromDate: string,
    @Query('orderField') orderField: string = 'saleDate',
    @Query('orderType') orderType: 'ASC' | 'DESC' = 'ASC',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.salesService.findAll(bookId, fromDate, orderField, orderType, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sale by id' })
  @ApiResponse({ status: 200, description: 'Return a single sale.' })
  @ApiResponse({ status: 404, description: 'Sale not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the sale to retrieve' })
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }
}
