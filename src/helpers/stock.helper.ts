import { DocumentType } from '@typegoose/typegoose';
import { Item } from 'model/item';
import { Post, PostModel } from 'model/post';

export const helperStock = {
  discountStockByItems: async function (items: DocumentType<Item>[]) {
    for(let item of items){
      let post = await PostModel.findById(item.getPostRef()) as DocumentType<Post>;
      if (post) {
        console.log("ENTRE");
        post.reduceStock(item.getAmount());
        await post.save();
        console.log(post);
      }
    }
  }
};
