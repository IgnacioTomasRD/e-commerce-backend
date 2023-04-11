import { prop, mongoose, Ref, getDiscriminatorModelForClass } from "@typegoose/typegoose";
import { Post, PostModel, TypesOfPost } from "./post";
import { Product } from "./product";
import { StatusPost } from "./statusPost";
import { TypeOfStatusPost } from "./typeOfStatusPost";


export class PostBase extends Post{
    @prop({ref: ()=> Product})
    private product?: Ref<Product>;
    @prop({ required: true })
    private name?: string;
    @prop({ required: true })
    private description?: string;
    @prop({ required: true })
    private price?: number;
    @prop({ required: true })
    private stock?: number;
    @prop({ ref: () => StatusPost, default: [] })
    private states!: mongoose.Types.Array<StatusPost>;
}
export const PostBaseModel = getDiscriminatorModelForClass(PostModel, PostBase, TypesOfPost.PostBasic);

