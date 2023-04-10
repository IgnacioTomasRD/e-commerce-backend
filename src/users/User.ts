import { prop,getModelForClass} from "@typegoose/typegoose";


export class User  {  
  @prop({required: true})
  private userName!: string;
  @prop({required: true})
  private password!: string;
  
  getUserName(): string {
    return this.userName;
  }
  getPassword(): string {
    return this.password;
  }
}

export const UserModel  = getModelForClass(User);


