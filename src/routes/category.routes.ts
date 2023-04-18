import { categoryController } from "@controllers/category.controller";
import { Router } from "express";
import { helperAuth } from "helpers/auth.helper";
import helperJWT from "helpers/jwt.helper";
import { RolUser } from "users/Rol";

const categoryRouter = Router();

categoryRouter.get('/category', (req,res) => categoryController.findAll(req,res));

categoryRouter.post('/category',helperJWT.validateToken,helperAuth.authUser([RolUser.ADMIN]),(req,res) => categoryController.save(req,res));


export default categoryRouter;