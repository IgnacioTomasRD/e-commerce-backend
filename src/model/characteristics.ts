import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

export class Characteristics{
    @prop({ required: true })
    private name?: string;
    @prop({ required: true })
    private value?: string

    constructor(name: string , value:string){
        this.name = name;
        this.value = value;
    }
}

