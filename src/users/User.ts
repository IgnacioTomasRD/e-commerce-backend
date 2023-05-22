import { prop,getModelForClass, Ref, DocumentType, modelOptions} from "@typegoose/typegoose";
import { Client } from "model/client";
import { RolUser } from "./Rol";

@modelOptions({schemaOptions: {collection: "users"}})
export class User  {  
  @prop({required: true})
  private email!: string;
  @prop({required: true})
  private password!: string;
  @prop({ref: ()=>Client, required: true})
  private client!: Ref<Client>;
  @prop({enum: RolUser, required: true})
  private rol!: RolUser;
  
  public getEmail(): string {
    return this.email;
  }
  public getPassword(): string {
    return this.password;
  }

  public getClientId(){
    return this.client;
  }

  public setRol(rol: RolUser){
    this.rol = rol;
  }
  public getRol(){
    return this.rol;
  }

}

export const UserModel  = getModelForClass(User);


