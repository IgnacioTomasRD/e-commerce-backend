import { getModelForClass, prop,modelOptions } from "@typegoose/typegoose";

@modelOptions({schemaOptions: {collection: "categories"}})
export class Category{
    @prop({ required: true })
    private name?: string;
}

export const CategoryModel = getModelForClass(Category)