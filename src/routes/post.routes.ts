import { postController } from "@controllers/post.controller";
import { Router } from "express";
import { helperAuth } from "helpers/auth.helper";
import helperJWT from "helpers/jwt.helper";
import { RolUser } from "users/Rol";


const postRouter = Router();

postRouter.post('/post/create',(req,res)=>postController.create(req,res));
postRouter.post('/post/prueba',(req,res)=>postController.prueba(req,res));
postRouter.post('/post/delete',(req,res)=>postController.delete90(req,res));
postRouter.get('/post',(req,res) => postController.findAll(req,res));
postRouter.get('/post/:id',(req,res) => postController.findById(req,res));
postRouter.get('/post/:id/state',(req,res) => postController.findByIdWithState(req,res));
postRouter.post('/post',helperJWT.validateToken,helperAuth.authUser([RolUser.ADMIN]),(req,res) => postController.save(req,res));
postRouter.patch('/post/:id',helperJWT.validateToken,helperAuth.authUser([RolUser.ADMIN]),(req,res) => postController.edit(req,res));
postRouter.delete('/post/:id',helperJWT.validateToken,helperAuth.authUser([RolUser.ADMIN]),(req,res)=>postController.delete(req,res));
postRouter.post('/post/:id',helperJWT.validateToken,helperAuth.authUser([RolUser.USER]),helperJWT.validateToken,(req,res)=>postController.handleTransaction(req,res));

export default postRouter;
//investigar multer para las imagenes