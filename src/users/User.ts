import { prop,getModelForClass, Ref, DocumentType} from "@typegoose/typegoose";
import { Client } from "model/client";


export class User  {  
  @prop({required: true})
  private userName!: string;
  @prop({required: true})
  private password!: string;
  @prop({type: ()=>Client})
  private client!: Client;
  
  getUserName(): string {
    return this.userName;
  }
  getPassword(): string {
    return this.password;
  }

  getClient(){
    return this.client;
  }
}

export const UserModel  = getModelForClass(User);


