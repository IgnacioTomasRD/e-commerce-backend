import { prop, mongoose,Ref,DocumentType, getDiscriminatorModelForClass } from "@typegoose/typegoose";
import { Post, PostModel, TypesOfPost } from "./post";
import { Product } from "./product";
import { PostStatus } from "./statusPost";



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
    @prop({ ref: () => PostStatus,type: () => [PostStatus], default: [] })
    public states!: mongoose.Types.Array<PostStatus>;

    public getStates(this: DocumentType<PostBase>) {
        // return this.states.filter(state => state.isActive());
        return this.states;
    }
}
export const PostBaseModel = getDiscriminatorModelForClass(PostModel, PostBase, TypesOfPost.PostBasic);

