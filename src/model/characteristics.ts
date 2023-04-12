import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({schemaOptions: {collection: "characteristics"}})
export class Characteristics{
    @prop({ required: true })
    private name?: string;
    @prop({ required: true })
    private description?: string
}

export const CharacteristicsModel = getModelForClass(Characteristics);