import { CategoryModel } from 'model/category';
import { Response,Request } from 'express';
import { Message } from 'utils/message';

export const categoryController = {
  findAll: async function (req: Request, res: Response): Promise<void> {
    const category = await CategoryModel.find();
    res.status(200).send(category);
  },

  save: async function(req: Request, res: Response): Promise<void>{
    const {name} = req.body;
  
    const category = await CategoryModel.create({name});
    category.save();
    res.status(201).send(Message.CATEGORY_SAVE_SUCCESFUL);

  }

};
