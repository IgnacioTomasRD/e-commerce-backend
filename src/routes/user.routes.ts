import userController from "@controllers/user.controller";
import { Router } from "express";
import helperJWT from "helpers/jwt.helper";

const userRouter = Router();

userRouter.get('/profile',helperJWT.validateToken,(req,res) => userController.profile(req,res));
userRouter.patch('/profile',helperJWT.validateToken,(req,res)=>userController.edit(req,res));
userRouter.patch('/profile/address',helperJWT.validateToken,(req,res)=>userController.editAddress(req,res));
userRouter.patch('/profile/client',helperJWT.validateToken,(req,res)=>userController.editClient(req,res));
userRouter.get('/purchases',helperJWT.validateToken,(req,res) => userController.purchases(req,res))

export default userRouter;
