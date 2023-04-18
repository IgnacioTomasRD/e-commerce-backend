import { DocumentType, mongoose } from '@typegoose/typegoose';
import { Request, Response } from 'express';
import { helperShoppingCart } from 'helpers/shoppingCart.helper';
import { helperTransaction } from 'helpers/transaction.helper';
import { Client, ClientModel } from 'model/client';
import { ItemModel } from 'model/item';
import { PostModel } from 'model/post';
import { UserModel } from 'users/User';
import { Message } from 'utils/message';

export const shoppingCartController = {
  async add(req: Request, res: Response) {
    const id = res.locals.userId;
    const { postId, amount } = req.body;
    const user = await UserModel.findById(id).exec();
    const post = await PostModel.findById(postId).exec();
    if (user && post) {
      const client = await ClientModel.findById(user.getClientId());
      if (client) {
        const item = await ItemModel.create({
          post: new mongoose.Types.ObjectId(postId),
          amount,
          price: post.getPrice()
        });
        await item.save();
        const shoppingCart = client.getShoppingCart();
        shoppingCart.add(item._id);
        await client.save();
        res.status(200).send(Message.ITEM_ADD_SUCCESFUL);
      } else {
        res.status(404).send(Message.CLIENT_NOT_FOUND);
      }
    } else {
      res.status(404).send(Message.POST_OR_USER_INCORRECT);
    }
  },
  async findAllItems(req: Request, res: Response) {
    const id = res.locals.userId;
    const user = await UserModel.findById(id);
    if (user) {
      const client = await ClientModel.findById(user.getClientId());
      if (client) return res.status(200).send(client.getShoppingCart());
      else return res.status(404).send(Message.CLIENT_NOT_FOUND);
    } else return res.status(404).send(Message.USER_NOT_FOUND);
  },
  async deleteItem(req: Request, res: Response) {
    const id = res.locals.userId;
    const itemToDelete = new mongoose.Types.ObjectId(req.params.itemId);
    const user = await UserModel.findById(id);
    const item = await ItemModel.findById(itemToDelete);
    if (!item) {
      res.status(404).send(Message.ITEM_NOT_FOUND);
    }
    if (user) {
      const client = await ClientModel.findById(user.getClientId());
      if (client) {
        const shoppingCart = client.getShoppingCart();
        shoppingCart.delete(itemToDelete);
        await ItemModel.findByIdAndRemove(itemToDelete);
        await client.save();
        res.status(200).send('item deleted sucessful');
      } else {
        res.status(404).send(Message.CLIENT_NOT_FOUND);
      }
    } else {
      res.status(404).send(Message.USER_NOT_FOUND);
    }
  },
  async buy(req: Request, res: Response) {
    const id = res.locals.userId;
    const user = await UserModel.findById(id);
    if (user) {
      const client = await ClientModel.findById(user.getClientId());
      if (client) {
        const shoppingCart = client.getShoppingCart();
        const items = await helperShoppingCart.getItemsOfShoppingCart(shoppingCart);
        const transaction = await helperTransaction.generateTransaction(client as DocumentType<Client>, items);
        await transaction.populate('transactionStatus');
        await transaction.save();
        return res.status(200).send(transaction);
      } else {
        return res.status(404).send(Message.CLIENT_NOT_FOUND);
      }
    } else {
      return res.status(404).send(Message.USER_NOT_FOUND);
    }
  }
};
