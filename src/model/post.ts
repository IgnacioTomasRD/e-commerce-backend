import { getModelForClass, modelOptions } from "@typegoose/typegoose";

export enum TypesOfPost {
  PostDecorated = 'PostDecorated',
  PostBasic = 'PostBasic'
}

@modelOptions({ schemaOptions: { collection: "posts" } })
export class Post {

  getPrice(){
    
  }
}

export const PostModel = getModelForClass(Post);