import { DocumentType, mongoose } from '@typegoose/typegoose';
import { Request, Response } from 'express';
import { helperShoppingCart } from 'helpers/shoppingCart.helper';
import { helperTransaction } from 'helpers/transaction.helper';
import { Client, ClientModel } from 'model/client';
import { ItemModel } from 'model/item';
import { PostModel } from 'model/post';
import { UserModel } from 'users/User';

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
        res.send('post agregado al carrito');
      } else {
        res.send('algo ha salido mal 1');
      }
    } else {
      res.send('algo ha salido mal 2');
    }
  },
  async findAllItems(req: Request, res: Response) {
    const id = res.locals.userId;
    const user = await UserModel.findById(id);
    if (user) {
      const client = await ClientModel.findById(user.getClientId());
      if (client) return res.send(client.getShoppingCart());
      else return res.send('no se encontro el cliente');
    } else return res.send('user not found');
  },
  async deleteItem(req: Request, res: Response) {
    const id = res.locals.userId;
    const itemToDelete = new mongoose.Types.ObjectId(req.params.itemId);
    const user = await UserModel.findById(id);
    if (user && itemToDelete) {
      const client = await ClientModel.findById(user.getClientId());
      if (client) {
        const shoppingCart = client.getShoppingCart();
        shoppingCart.delete(itemToDelete);
        client.save();
        res.send('item deleted sucessful');
      } else {
        res.send('no se ha encontrado el cliente');
      }
    } else {
      res.send('the user or item not found');
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
        return res.send(transaction);
      } else {
        return res.send('no se encontro el cliente');
      }
    } else return res.send('user not found');
  }
};
