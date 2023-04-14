import { prop,getModelForClass, Ref, DocumentType, modelOptions} from "@typegoose/typegoose";
import { Client } from "model/client";

@modelOptions({schemaOptions: {collection: "users"}})
export class User  {  
  @prop({required: true})
  private userName!: string;
  @prop({required: true})
  private password!: string;
  @prop({ref: ()=>Client, required: true})
  private client!: Ref<Client>;
  
  public getUserName(): string {
    return this.userName;
  }
  public getPassword(): string {
    return this.password;
  }

  public getClientId(){
    return this.client;
  }
}

export const UserModel  = getModelForClass(User);


