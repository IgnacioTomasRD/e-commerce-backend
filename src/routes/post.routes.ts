import { postController } from "@controllers/post.controller";
import { Router } from "express";


const postRouter = Router();

postRouter.get('/post',(req,res) => postController.findAll(req,res));
postRouter.get('/post/:id',(req,res) => postController.findById(req,res));
postRouter.get('/post/:id/state',(req,res) => postController.findByIdWithState(req,res));
postRouter.post('/post',(req,res) => postController.save(req,res));
postRouter.patch('/post/:id',(req,res) => postController.edit(req,res));
postRouter.delete('/post/:id',(req,res)=>postController.delete(req,res));
postRouter.post('/post/:id',(req,res)=>postController.handleTransaction(req,res));

export default postRouter;
//investigar multer para las imagenes