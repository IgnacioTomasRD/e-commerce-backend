import { mongoose } from '@typegoose/typegoose';
import { Request, Response } from 'express';
import { Item, ItemModel } from 'model/item';
import { PostModel } from 'model/post';
import { PostBaseModel } from 'model/postBase';
import { ProductModel } from 'model/product';
import { StatusPostModel } from 'model/statusPost';
import { TypeOfStatusPost } from 'model/typeOfStatusPost';
import { UserModel } from 'users/User';

export const postController = {
  save: async function (req: Request, res: Response) {
    try {
      const { productId, name, description, price, stock } = req.body;
      const product = await ProductModel.findById(new mongoose.Types.ObjectId(productId));
      const newState = await createNewState();
      const postBase = await PostBaseModel.create({ product, name, description, price, stock, states: [newState] });
      postBase.save();
      res.send(postBase);
    } catch (error: any) {
      res.send(error.message);
    }
  },
  findAll: async function (req: Request, res: Response) {
    const posts = await PostModel.find();
    return res.send(posts);
  },

  findById: async function (req: Request, res: Response) {
    const id = req.params.id;
    const post = await PostModel.findById(new mongoose.Types.ObjectId(id));
    if (post) {
      res.send(post);
    } else {
      res.status(404).send('post not found');
    }
  },

  findByIdWithState: async function (req: Request, res: Response) {
    const id = req.params.id;
    let post = await PostBaseModel.findById(new mongoose.Types.ObjectId(id));
    if (post) {
      await post.populate('states');
      //revisar proyeccion para que no se manden los states
      let postProyection = { ...post.toObject(), stateActive: post.getStates().find((state) => state.isActive()) };
      res.send(postProyection);
    } else {
      res.status(404).send('post not found');
    }
  },
  edit: async function (req: Request, res: Response) {
    const { id } = req.params;
    const updates = req.body;
    const options = { new: true };
    const post = await PostModel.findOneAndUpdate({ _id: id }, updates, options);
    if (!post) {
      return res.status(404).json('Post not found');
    }
    return res.status(200).send(post);
  },
  delete: async function (req: Request, res: Response) {
    const { id } = req.params;
    if (await PostBaseModel.findById(id)) {
      await PostBaseModel.findByIdAndRemove(id).exec();
      return res.send('product deleted sucessful');
    } else {
      return res.send('Post not found');
    }
  },
  handleTransaction: async function (req: Request, res: Response) {
    const idUser = res.locals.userId;
    const user = await UserModel.findById(idUser);
    if (user) {
      const client = user.getClient();
      const { amount } = req.body;
      const idProd = req.params.id;
      const item = await ItemModel.create(idProd, amount);
    }
  }
};

async function createNewState() {
  return await StatusPostModel.create({ typeOfStatusPost: TypeOfStatusPost.active, date: new Date(), active: true });
}
