import { productController } from "@controllers/product.controller";
import { Router } from "express";


const productRouter = Router();

productRouter.get('/product',(req,res) => productController.findAll(req,res));
productRouter.get('/product/:id',(req,res) => productController.findById(req,res));
productRouter.post('/product',(req,res) => productController.save(req,res));
productRouter.patch('/product/:id',(req,res) => productController.edit(req,res));
productRouter.delete('/product/:id',(req,res)=>productController.delete(req,res));

export default productRouter;