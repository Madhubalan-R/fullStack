import { Request, Response } from "express";
import { AppDataSource } from "../dbConfig";
import { UserDetails } from "../models/userTable";
import { BookDetails } from "../models/bookTable";
import { validateData } from "./ValidateData";
import { UserBook } from "../models/userBookTable";

export const viewUser = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(UserDetails);
    const users = await userRepository.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching books:", error);
    return res.status(500).json({ message: "Books not found" });
  }
};


// Route to show book 
export const showbook = async (req: Request, res: Response) => {
    const bookRepository = AppDataSource.getRepository(BookDetails);
    try {
      const books = await bookRepository.find();
      return res.json(books);
    } catch (error) {
      console.error("Error to add book", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

 export const addNewBook  = async (req: Request, res: Response) => {
    console.log(req.body);
    
    const bookRepository = AppDataSource.getRepository(BookDetails);
    try {
      const { bookname } = req.body;
      const newBook = bookRepository.create({bookname:bookname}); 
       await bookRepository.save(newBook);
      return res.status(201).json({ newBook });
    } catch (error) {
      console.error('Error while adding book:', error);
      return res.status(500).json({ message: 'Failed to add record', });
    }
  };

  

 // Route to get a book by ID
 export const deleteBook = async (req: Request, res: Response) => {
  const bookRepository = AppDataSource.getRepository(BookDetails);
  try {
    const bookId = parseInt(req.params.id);
    const book = await bookRepository.findOneBy({ ID: bookId }); 
    if (!book) {
      return res.status(404).json({ status: 404, message: 'Book not found' });
    }
    await bookRepository.remove(book);
    console.log("Record deleted successfully");
    return res.status(200).json({ status: 200, message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error while deleting book:', error);
    return res.status(500).json({ status: 500, message: 'Failed to delete record' });
  }
};

//Get All data from userBook table

export const getUserBooks = async (req: Request, res: Response) => {
  const userBookRepo = AppDataSource.getRepository(UserBook);
    try {
      const userBooks = await userBookRepo.find();
      return res.status(200).json(userBooks);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Cannot retrieve data" });
    }
  };
  //delete data in userBook table
export const deleteUB = async (req: Request, res: Response) => {
    try {
      const UBID = parseInt(req.params.id);
      if (isNaN(UBID)) {
        return res
          .status(400)
          .json({ message: "Invalid UB_ID. It must be an integer." });
      }
      const userBookRepo = AppDataSource.getRepository(UserBook);
      const userBook = await userBookRepo.findOneBy({ UBID: UBID });
      if (!userBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      await userBookRepo
        .createQueryBuilder()
        .delete()
        .from(UserBook)
        .where({ UBID: UBID })
        .execute();
      return res.status(200).json({ message: "Book deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "cannot delete data" });
    }
  };
  
  //update data in userBook table
  export const updateUB = async (req: Request, res: Response) => {
    try {
      const UBID = parseInt(req.params.id);
      const update = req.body;
      if (isNaN(UBID)) {
        return res
          .status(400)
          .json({ message: "Invalid UBID. It must be an integer." });
      }
      if (!validateData(update)) {
        return res.status(400).json({
          message:
            "Invalid update data. Ensure all fields are correctly formatted.",
        });
      }
  
      const userRepo = AppDataSource.getRepository(UserBook);
      const userBook = await userRepo.findOneBy({ UBID: UBID });
      if (!userBook) {
        return res.status(404).json({ message: "User not found" });
      }
      Object.assign(userBook, update);
      await userRepo.save(userBook);
      return res.status(200).json({ message: "updated successfully " });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "cannot update data" });
    }
  };