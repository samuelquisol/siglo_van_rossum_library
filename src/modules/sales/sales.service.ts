import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { Book } from '../books/entities/book.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly salesRepository: Repository<Sale>,
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const { customer, bookId, saleDate, totalPrice } = createSaleDto;
    const book = await this.booksRepository.findOneBy({ id: bookId });
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }
    const sale = this.salesRepository.create({ customer, book, saleDate, totalPrice });
    return this.salesRepository.save(sale);
  }

  async findAll(
    bookId: number,
    fromDate: string,
    orderField: string = 'saleDate',
    orderType: 'ASC' | 'DESC' = 'ASC',
    page: number = 1,
    limit: number = 10
  ) {
    let whereClause: any = {};

    if (bookId) {
      whereClause.book = { id: bookId };
    }

    if (fromDate) {
      whereClause.saleDate = { $gte: fromDate };
    }

    const [results, total] = await this.salesRepository.findAndCount({
      where: whereClause,
      order: { [orderField]: orderType },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['book'],
    });

    return {
      data: results,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Sale> {
    const sale = await this.salesRepository.findOneBy({ id }/* , { relations: ['book'] } */);
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
    return sale;
  }
}
