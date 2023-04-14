import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

export enum TypesOfPost {
  PostDecorated = 'PostDecorated',
  PostBasic = 'PostBasic'
}

@modelOptions({ schemaOptions: { collection: "posts" } })
export class Post {
  @prop({ required: true })
  public stock!: number;

  getPrice(){
    
  }

  public reduceStock(stock: number){
    console.log(stock + "stock actual: " + this.getStock() )
    this.stock =  this.getStock() - stock;
  } 

  public getStock(){
    return this.stock;
  }

}

export const PostModel = getModelForClass(Post);