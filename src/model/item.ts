import { Ref, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Post } from './post';

@modelOptions({ schemaOptions: { collection: 'items' } })
export class Item {
  @prop({ ref: () => Post, required: true })
  private post!: Ref<Post>;
  @prop({ required: true,default:0})
  private amount: number = 0;
  @prop({ required: true,default:0 })
  private price: number = 0;

  getPrice(){
    return this.price;
  }
  getAmount(){
    return this.amount;
  }
  getPostRef(){
    return this.post;
  }
}

export const ItemModel = getModelForClass(Item);
