import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { TypeOfStatusPost } from "./typeOfStatusPost";


@modelOptions({schemaOptions: {collection: "StatusPosts"}})
export class StatusPost {
    @prop({ref: ()=> Date})
    private date?: Date;
    @prop({enum: TypeOfStatusPost})
    private typeOfStatusPost?: TypeOfStatusPost;
    @prop()
    private isActive!:boolean;

    constructor(typeOfStatusPost: TypeOfStatusPost){
        this.typeOfStatusPost = typeOfStatusPost;
        this.date = new Date();
        this.isActive = true;
    }
}

export const StatusPostModel = getModelForClass(StatusPost);