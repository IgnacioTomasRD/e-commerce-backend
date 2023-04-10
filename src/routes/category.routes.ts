import { categoryController } from "@controllers/category.controller";
import { Router } from "express";

const categoryRouter = Router();

categoryRouter.get('/category', (req,res) => categoryController.findAll(req,res));

categoryRouter.post('/category',(req,res) => categoryController.save(req,res));


export default categoryRouter;