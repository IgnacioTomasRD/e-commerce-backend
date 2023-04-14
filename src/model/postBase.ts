import { prop, mongoose,Ref,DocumentType, getDiscriminatorModelForClass } from "@typegoose/typegoose";
import { Post, PostModel, TypesOfPost } from "./post";
import { Product } from "./product";
import { PostStatus } from "./PostStatus";



export class PostBase extends Post{
    @prop({ref: ()=> Product})
    private product?: Ref<Product>;
    @prop({ required: true })
    private name?: string;
    @prop({ required: true })
    private description?: string;
    @prop({ required: true })
    private price!: number;
    @prop({ ref: () => PostStatus,type: () => [PostStatus], default: [] })
    public states!: mongoose.Types.Array<PostStatus>;

    public getStates() {
        // return this.states.filter(state => state.isActive());
        return this.states;
    }

    public getPrice(): number {
        return this.price;
    }

}
export const PostBaseModel = getDiscriminatorModelForClass(PostModel, PostBase, TypesOfPost.PostBasic);

