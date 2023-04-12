import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({schemaOptions: {collection: "clients"}})
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
}

export const AddressModel = getModelForClass(Address);
