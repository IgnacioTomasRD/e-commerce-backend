import { mongoose } from '@typegoose/typegoose';
import { Request, Response } from 'express';
import { ClientModel } from 'model/client';
import { ItemModel } from 'model/item';
import { ShoppingCartModel } from 'model/shoppingCart';
import { UserModel } from 'users/User';

export const shoppingCartController = {
  async add(req: Request, res: Response) {
    const id = res.locals.userId;
    const {postId, amount} = req.body;
    const user = await UserModel.findById(id).exec();
    if (user) {
      const client = user.getClient();
      const item = await ItemModel.create({post:new mongoose.Types.ObjectId(postId),amount});
      const shoppingCart = client.getShoppingCart()
      shoppingCart.add(item._id);
      await user.save();
      res.send("post agregado al carrito");
    } else {
        res.send("algo ha salido mal");
    }
  },
  async findAllItems(req: Request,res: Response){
    const id = res.locals.userId;
    const user = await UserModel.findById(id);
    if(user)
      return res.send(user.getClient().getShoppingCart());
    else
      return res.send('user not found');
  },
  async deleteItem(req: Request,res: Response){
    const id = res.locals.userId;
    const itemToDelete = new mongoose.Types.ObjectId(req.params.itemId);
    const user = await UserModel.findById(id);
    if(user && itemToDelete){
      const shoppingCart= user.getClient().getShoppingCart();
      shoppingCart.delete(itemToDelete);
      user.save();
      res.send("item deleted sucessful");

    } else {
      res.send("the user or item not found")
    }
  }
};
