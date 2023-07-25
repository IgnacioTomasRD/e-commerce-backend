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
  },
  // generate a function to edit a category by id with try catch
  edit: async function(req: Request, res: Response): Promise<void>{
    const {name} = req.body;
    const {id} = req.params;
    try{
      const category = await CategoryModel.findByIdAndUpdate(id,{name});
      res.status(200).send(Message.CATEGORY_EDIT_SUCCESFUL);
    }catch(error){
      res.status(404).send(Message.CATEGORY_NOT_FOUND);
    }
  },
  // generate a function to delete a category by id with try catch
  delete: async function(req: Request, res: Response): Promise<void>{
    const {id} = req.params;
    try{
      const category = await CategoryModel.findByIdAndDelete(id);
      res.status(200).send(Message.CATEGORY_DELETE_SUCCESFUL);
    }catch(error){
      res.status(404).send(Message.CATEGORY_NOT_FOUND);
    }
  },
};
