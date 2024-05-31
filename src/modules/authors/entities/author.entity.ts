import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, DeleteDateColumn  } from 'typeorm';
/* import { Book } from '../books/book.entity';
 */
@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  biography: string;

/*   @ManyToMany(() => Book, book => book.authors)
  @JoinTable()
  books: Book[];
 */

  @DeleteDateColumn()
  deletedAt?: Date;
}
