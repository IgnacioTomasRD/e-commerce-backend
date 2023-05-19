import { getModelForClass, prop } from "@typegoose/typegoose";

export class Address {
  @prop({ required: true })
  private street?: string;
  @prop({ required: true })
  private number?: number;
  @prop()
  private extraDescription?: string;
  @prop({ required: true })
  private locality?: string;
  @prop({ required: true })
  private province?: string;

  getStreet(){
    return this.street;
  }
  getNumber(){
    return this.number;
  }
  getExtraDescription(){
    return this.extraDescription;
  }
  getLocality(){
    return this.locality;
  }
  getProvince(){
    return this.province;
  }
}

export const AddressModel = getModelForClass(Address);
