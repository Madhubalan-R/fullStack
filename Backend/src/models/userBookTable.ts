import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import {UserDetails} from './userTable';
import { BookDetails} from './bookTable';

@Entity()
export class UserBook extends BaseEntity{
  @PrimaryGeneratedColumn()
  UBID: number;

  @ManyToOne(() => UserDetails, user => user.userBooks)
  username: UserDetails;

  @ManyToOne(() => BookDetails, book => book.userBooks,{onDelete: "CASCADE"})
  bookname: BookDetails;
  
  @Column()
  startdate:string;

  @Column()
  enddate:string;




  
}
