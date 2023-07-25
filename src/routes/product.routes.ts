import { productController } from "@controllers/product.controller";
import { Router } from "express";
import { helperAuth } from "helpers/auth.helper";
import helperJWT from "helpers/jwt.helper";
import { RolUser } from "users/Rol";

const productRouter = Router();

productRouter.get('/product',helperJWT.validateToken,helperAuth.authUser([RolUser.ADMIN]),(req,res) => productController.findAll(req,res));
productRouter.get('/product/:id',helperJWT.validateToken,helperAuth.authUser([RolUser.ADMIN]),(req,res) => productController.findById(req,res));
productRouter.post('/product',helperJWT.validateToken,helperAuth.authUser([RolUser.ADMIN]),(req,res) => productController.save(req,res));
productRouter.patch('/product/:id',helperJWT.validateToken,helperAuth.authUser([RolUser.ADMIN]),(req,res) => productController.edit(req,res));
productRouter.delete('/product/:id',helperJWT.validateToken,helperAuth.authUser([RolUser.ADMIN]),(req,res)=>productController.delete(req,res));

export default productRouter;