import { getModelForClass, prop } from "@typegoose/typegoose";

export class Characteristics{
    @prop({ required: true })
    private name?: string;
    @prop({ required: true })
    private description?: string
}

export const CharacteristicsModel = getModelForClass(Characteristics);