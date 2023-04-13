import { Ref, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Post } from './post';

@modelOptions({ schemaOptions: { collection: 'items' } })
export class Item {
  @prop({ ref: () => Post, required: true })
  private post?: Ref<Post>;
  @prop({ required: true })
  private amount?: number;
  @prop({ required: true })
  private price?: number;
}

export const ItemModel = getModelForClass(Item);
