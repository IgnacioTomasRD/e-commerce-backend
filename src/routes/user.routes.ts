import userController from "@controllers/user.controller";
import { Router } from "express";
import helperJWT from "helpers/jwt.helper";

const userRouter = Router();

userRouter.get('/profile',helperJWT.validateToken,(req,res) => userController.profile(req,res));
userRouter.patch('/profile',helperJWT.validateToken,(req,res)=>userController.edit(req,res));
userRouter.get('/purchases',helperJWT.validateToken,(req,res) => userController.purchases(req,res));
userRouter.get('/getUserByJWT',helperJWT.validateToken,(req,res) => userController.getUser(req,res));

export default userRouter;
