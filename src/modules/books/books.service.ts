import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
/* import { Author } from '../authors/entities/author.entity';
 */
@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
/*     @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
 */  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { title, genre, publicationYear, isbn, synopsis, authorIds } = createBookDto;
/*     const authors = await this.authorsRepository.findByIds(authorIds);
 */    const book = this.booksRepository.create({ title, genre, publicationYear, isbn, synopsis, /* authors */ });
    return this.booksRepository.save(book);
  }

  async findAll(
    searchTerm: string,
    orderField: string = 'id',
    orderType: 'ASC' | 'DESC' = 'ASC',
    page: number = 1,
    limit: number = 10
  ) {
    let whereClause: any = {};

    if (searchTerm) {
      whereClause = { title: ILike(`%${searchTerm}%`) };
    }

    const [results, total] = await this.booksRepository.findAndCount({
      where: whereClause,
      order: { [orderField]: orderType },
      skip: (page - 1) * limit,
      take: limit,
/*       relations: ['authors'],
 */    });

    return {
      data: results,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOneBy({ id }/* , { relations: ['authors'] } */);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: number, updateBookDto: CreateBookDto): Promise<Book> {
    const { title, genre, publicationYear, isbn, synopsis, authorIds } = updateBookDto;
/*     const authors = await this.authorsRepository.findByIds(authorIds);
 */    await this.booksRepository.update(id, { title, genre, publicationYear, isbn, synopsis, /* authors */ });
    const updatedBook = await this.booksRepository.findOneBy({ id }/* , { relations: ['authors'] } */);
    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return updatedBook;
  }

  async remove(id: number): Promise<void> {
    const result = await this.booksRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }
}
