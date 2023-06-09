import { prop, Ref, getModelForClass, modelOptions, mongoose } from '@typegoose/typegoose';
import { Category } from './category';
import { Characteristics } from './characteristics';

@modelOptions({schemaOptions: {collection: "products"}})
export class Product {
  @prop({ required: true })
  private name?: string;
  @prop({ required: true })
  private description?: string;
  @prop({ ref: () => Category,default: [] })
  private categories?: mongoose.Types.Array<Category>;
  @prop({default:[]})
  private characteristics?: Characteristics[];
  @prop({ type: String, required: true, default: [] })
  private imgs?: mongoose.Types.Array<string>;
}

export const ProductModel = getModelForClass(Product);