import { BeAnObject, IObjectWithTypegooseFunction } from '@typegoose/typegoose/lib/types';
import { Request, Response, response } from 'express';
import { CategoryModel } from 'model/category';
import { Characteristics } from 'model/characteristics';
import { Product, ProductModel } from 'model/product';
import { Document, Types } from 'mongoose';
import { Message } from 'utils/message';

export const productController = {
  findAll: async function (req: Request, res: Response): Promise<void> {
    try {
      const products = await ProductModel.find();
      res.status(200).send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  save: async function (req: Request, res: Response) {
    const { name, description, categories, characteristics, imgs } = req.body;
    const characteristicsArray: Characteristics[]= [];

    characteristics.forEach(async (ch: any) =>{
      // const newCharacterisct = await CharacteristicsModel.create({name: ch.name,value: ch.value})
      // await newCharacterisct.save();
      return characteristicsArray.push(new Characteristics(ch.name,ch.value));
    })

    try {
      const categoriesSelected = await getCategoriesByNames(categories);
      const newProduct = await ProductModel.create({
        name,
        description,
        categories: categoriesSelected,
        characteristics: characteristicsArray,
        imgs
      });
      await newProduct.save();
      res.status(201).send(newProduct);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  },
  findById: async function (req: Request, res: Response) {
    const { id } = req.params;
    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json(Message.PRODUCT_NOT_FOUND);
    }
    return res.status(200).send(product);
  },

  edit: async function (req: Request, res: Response) {
    const { id } = req.params;
    const updates = req.body;
    const options = { new: true };
    const categories = await getCategoriesByNames(updates.categories);
    updates.categories = categories;

    const product = await ProductModel.findOneAndUpdate({ _id: id }, updates, options);

    if (!product) {
      return res.status(404).json(Message.PRODUCT_NOT_FOUND);
    }

    return res.status(200).send(product);
  },
  delete: async function (req: Request, res: Response) {
    const { id } = req.params;
    if (await ProductModel.findById(id)) {
      await ProductModel.findByIdAndRemove(id).exec();
      return res.status(200).send('product deleted sucessful')
    } else {
      return res.status(404).send(Message.PRODUCT_NOT_FOUND);
    }
  }
};

async function getCategoriesByNames(categories: string[]) {
  const categoriesSelected = [];
  for (let categoryName of categories) {
    const category = await CategoryModel.findOne({ name: categoryName });
    if (category) categoriesSelected.push(category);
  }
  return categoriesSelected;
}
