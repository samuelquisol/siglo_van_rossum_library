import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, DeleteDateColumn } from 'typeorm';
import { Author } from '../../authors/entities/author.entity';
import { Sale } from '../../sales/entities/sale.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  publicationYear: number;

  @Column()
  isbn: string;

  @Column({ nullable: true })
  synopsis: string;

  @ManyToMany(() => Author, author => author.books)
  @JoinTable()
  authors: Author[];

  @OneToMany(() => Sale, sale => sale.book)
  sales: Sale[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
