import { Request, Response, response } from 'express';
import { CategoryModel } from 'model/category';
import { ProductModel } from 'model/product';

export const productController = {
  findAll: async function(req: Request, res: Response): Promise<void> {
    try {
      const products = await ProductModel.find();
      res.send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  save: async function(req: Request,res: Response){
    const {name,description,categoryName,characteristics,img} = req.body;
    try {
      const category_ = await CategoryModel.findOne({name: categoryName});
      const category = [category_];
      const newProduct = await ProductModel.create({name,description,category,characteristics,img});
      newProduct.save();
      res.send(newProduct);
    } catch (error:any) {
      res.send(error.message);
    }
  }
  
};
