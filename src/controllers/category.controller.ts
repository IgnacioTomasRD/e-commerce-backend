import { CategoryModel } from 'model/category';
import { Response,Request } from 'express';

export const categoryController = {
  findAll: async function (req: Request, res: Response): Promise<void> {
    try {
      const category = await CategoryModel.find();
      res.send(category);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  save: async function(req: Request, res: Response): Promise<void>{
    const {name} = req.body;
    try {
        const category = await CategoryModel.create({name});
        category.save();
        res.send("categoria guardada con exito");
    } catch (error: any) {
        res.status(400).send(error.message);
    }
  }

};
