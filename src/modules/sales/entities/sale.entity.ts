import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, DeleteDateColumn } from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer: string;

  @Column()
  saleDate: Date;

  @Column('decimal')
  totalPrice: number;

  @ManyToOne(() => Book, book => book.sales)
  book: Book;

  @DeleteDateColumn()
  deletedAt?: Date;
}
