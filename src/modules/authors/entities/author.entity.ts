import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, DeleteDateColumn  } from 'typeorm';
import { Book } from 'src/modules/books/entities/book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  biography: string;

  @ManyToMany(() => Book, book => book.authors)
  @JoinTable()
  books: Book[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
