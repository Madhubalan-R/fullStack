// import { Router } from "express";
import { signIn, signUp } from "../controllers/userController";
import { adminMiddleware } from "../middleware/adminMiddleware";
import { viewUser,addNewBook, showbook, deleteBook, deleteUB, updateUB, getUserBooks } from "../controllers/adminController";
import express from "express";

const router = express.Router();

router.post("/signup",  signUp);
router.post("/signin",  signIn);

router.get('/viewUser',viewUser);

router.get('/show', adminMiddleware, showbook );
router.post('/createBook', adminMiddleware, addNewBook );

router.delete('/deleteBook/:id',adminMiddleware, deleteBook); 

router.get('/userbooks', getUserBooks);
router.delete("/deleteUB/:id", adminMiddleware, deleteUB);
router.put("/updateUB/:id", adminMiddleware, updateUB);



export{
    router as adminRoutes
}