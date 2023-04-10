import { productController } from "@controllers/product.controller";
import { Router } from "express";


const productRouter = Router();

productRouter.get('/product',(req,res) => productController.findAll(req,res));
productRouter.post('/product',(req,res) => productController.save(req,res));





export default productRouter;