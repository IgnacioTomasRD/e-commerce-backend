import { prop,getModelForClass } from "@typegoose/typegoose";


export class User  {  
  @prop()
  private _id?: string;
  @prop()
  private userName: string;
  @prop()
  private password: string;
  constructor(userName: string, password: string, _id?: string) {
    this.userName = userName;
    this.password = password;
    this._id = _id;
  }
  getUserName(): string {
    return this.userName;
  }
  getPassword(): string {
    return this.password;
  }
  getUserId(): string | undefined {
    return this._id;
  }
}

const userModel = getModelForClass(User);

export default userModel;

