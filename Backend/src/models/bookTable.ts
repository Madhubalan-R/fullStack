import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserBook } from "./userBookTable";

@Entity()
export class BookDetails {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  bookname: string;

  @OneToMany(() => UserBook, (userBook) => userBook.bookname)
  userBooks: UserBook[];
}
  