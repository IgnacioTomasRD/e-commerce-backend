import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({schemaOptions: {collection: "products"}})
export class Bill {
  @prop({required: true})
  private path!: string;
}

export const BillModel = getModelForClass(Bill);