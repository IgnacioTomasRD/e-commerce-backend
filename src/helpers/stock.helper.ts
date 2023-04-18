import { DocumentType } from '@typegoose/typegoose';
import { Item } from 'model/item';
import { Post, PostModel } from 'model/post';

export const helperStock = {
  discountStockByItems: async function (items: DocumentType<Item>[]) {
    for (let item of items) {
      let post = (await PostModel.findById(item.getPostRef())) as DocumentType<Post>;
      if (post) {
        if (post.getStock() - item.getAmount() >= 0) {
          post.reduceStock(item.getAmount());
          await post.save();
          console.log(post);
        } else {
          throw new Error("no hay mas stock del producto: " + post._id)
        }
      }
    }
  }
};
