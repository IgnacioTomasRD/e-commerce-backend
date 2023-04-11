import { Request, Response, response } from 'express';
import { CategoryModel } from 'model/category';
import { Product, ProductModel } from 'model/product';

export const productController = {
  findAll: async function (req: Request, res: Response): Promise<void> {
    try {
      const products = await ProductModel.find();
      res.send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  save: async function (req: Request, res: Response) {
    const { name, description, categories, characteristics, img } = req.body;

    try {
      const categoriesSelected = await getCategoriesByNames(categories);
      const newProduct = await ProductModel.create({
        name,
        description,
        categories: categoriesSelected,
        characteristics,
        img
      });
      newProduct.save();
      res.send(newProduct);
    } catch (error: any) {
      res.send(error.message);
    }
  },
  findById: async function (req: Request, res: Response) {
    const { id } = req.params;
    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json('Product not found');
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
      return res.status(404).json('Product not found');
    }

    return res.status(200).send(product);
  },
  delete: async function (req: Request, res: Response) {
    const { id } = req.params;
    if (await ProductModel.findById(id)) {
      await ProductModel.findByIdAndRemove(id).exec();
      return res.send('product deleted sucessful')
    } else {
      return res.send('Product not found');
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
