import { DocumentType, mongoose } from '@typegoose/typegoose';
import { Request, Response } from 'express';
import { helperTransaction } from 'helpers/transaction.helper';
import { Item, ItemModel } from 'model/item';
import { Post, PostModel } from 'model/post';
import { PostBase, PostBaseModel } from 'model/postBase';
import { ProductModel } from 'model/product';
import { StatusPostModel } from 'model/PostStatus';
import { TypeOfStatusPost } from 'model/typeOfStatusPost';
import { UserModel } from 'users/User';
import { Client, ClientModel } from 'model/client';
import { Message } from 'utils/message';
import { SIZE_PAGES } from 'utils';

export const postController = {
  save: async function (req: Request, res: Response) {
    try {
      const { productId, name, description, price, stock } = req.body;
      const product = await ProductModel.findById(new mongoose.Types.ObjectId(productId));
      const newState = await createNewState();
      const postBase = await PostBaseModel.create({ product, name, description, price, stock, states: [newState] });
      await postBase.save();
      res.status(201).send(postBase);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  },
  findAll: async function (req: Request, res: Response) {
    const offset = req.query.page ? (+req.query.page - 1) * SIZE_PAGES : 0;
    let posts = await PostModel.aggregate([{ $skip: offset }, { $limit: SIZE_PAGES }]).exec();
    await PostModel.populate(posts, [{ path: 'product' }, { path: 'states' }]);
    await PostModel.populate(posts, { path: 'product.categories' });
    const pages = Math.ceil((await PostModel.countDocuments()) / SIZE_PAGES);
    return res.status(200).send({ length: posts.length, posts, pages });
  },
  // TODO
  prueba: async function (req: Request, res: Response) {
    const query = [
      {
        $lookup: {
          from: 'products', // Nombre de la tabla de productos
          localField: 'product',
          foreignField: '_id',
          as: 'productInfo'
        }
      },
      {
        $match: {
          'productInfo.name': req.body.value
        }
      }
    ];

    const result = await PostModel.aggregate(query);
    console.log('🚀 ~ file: post.controller.ts:53 ~ result:', result);
    res.send(result);
  },

  create: async function (req: Request, res: Response) {
    let productId = '6467c552c95991dc3619c998';
    let name = 'prueba';
    let description = 'prueba';
    let price = 10;
    let stock = 10;

    for (let i = 0; i < 70; i++) {
      try {
        const product = await ProductModel.findById(new mongoose.Types.ObjectId(productId));
        const newState = await createNewState();
        const postBase = await PostBaseModel.create({ product, name, description, price, stock, states: [newState] });
        await postBase.save();
        res.send('success');
      } catch (error) {
        console.log('🚀 ~ file: post.controller.ts:57 ~ error:', error);
      }
    }
  },

  delete90: async function (req: Request, res: Response) {
    try {
      await PostModel.deleteMany();
      console.log('Documentos borrados exitosamente.');
    } catch (error) {
      console.error('Error al borrar documentos:', error);
    }
    res.send('sucess on delete');
  },

  findById: async function (req: Request, res: Response) {
    const id = req.params.id;
    const post = await PostModel.findById(new mongoose.Types.ObjectId(id));
    if (post) {
      (await (await post?.populate('product')).populate('product.categories')).populate('states');
      res.send(post);
    } else {
      res.status(404).send(Message.POST_NOT_FOUND);
    }
  },

  findByIdWithState: async function (req: Request, res: Response) {
    const id = req.params.id;
    let post = await PostBaseModel.findById(new mongoose.Types.ObjectId(id));
    if (post) {
      await post.populate('states');
      let postProyection = { ...post.toObject(), stateActive: post.getStates().find((state) => state.isActive()) };
      res.status(200).send(postProyection);
    } else {
      res.status(404).send(Message.POST_NOT_FOUND);
    }
  },
  edit: async function (req: Request, res: Response) {
    const { id } = req.params;
    const updates = req.body;
    const options = { new: true };
    const post = await PostModel.findOneAndUpdate({ _id: id }, updates, options);
    if (!post) {
      return res.status(404).json(Message.POST_NOT_FOUND);
    }
    return res.status(201).send(post);
  },
  delete: async function (req: Request, res: Response) {
    const { id } = req.params;
    if (await PostBaseModel.findById(id)) {
      await PostBaseModel.findByIdAndRemove(id).exec();
      return res.status(200).send(Message.POST_DELETE_SUCESSFUL);
    } else {
      return res.status(404).send(Message.POST_NOT_FOUND);
    }
  },
  handleTransaction: async function (req: Request, res: Response) {
    const idUser = res.locals.userId;
    const user = await UserModel.findById(idUser);
    if (user) {
      const client = await ClientModel.findById(user.getClientId());
      if (client != null) {
        const amount = req.query.amount || 1;
        const idPost = req.params.id;
        const post = await PostModel.findById(idPost);
        const item = await ItemModel.create({ post: idPost, amount, price: post?.getPrice() });
        await item.save();
        const transaction = await helperTransaction.generateTransaction(
          client as DocumentType<Client>,
          [item] as DocumentType<Item>[]
        );
        await transaction.populate('transactionStatus');
        await transaction.save();
        res.status(201).send(transaction);
      } else {
        res.status(404).send(Message.CLIENT_NOT_FOUND);
      }
    } else {
      res.status(404).send(Message.USER_NOT_FOUND);
    }
  }
};

async function createNewState() {
  return await StatusPostModel.create({ typeOfStatusPost: TypeOfStatusPost.active, date: new Date(), active: true });
}
