import { DocumentType } from "@typegoose/typegoose";
import { Item, ItemModel } from "model/item";
import { ShoppingCart } from "model/shoppingCart";

export const helperShoppingCart = {
  async getItemsOfShoppingCart(shoppingCart: ShoppingCart) {
    const items: DocumentType<Item>[] = [];
    for (let itemRef of shoppingCart.getItems()) {
      let item = await ItemModel.findById(itemRef._id);
      if (item) items.push(item as DocumentType<Item>);
    }
    return items;
  }
};
