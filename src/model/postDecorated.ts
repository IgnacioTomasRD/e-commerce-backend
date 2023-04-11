import { Ref, getDiscriminatorModelForClass, prop } from "@typegoose/typegoose";
import { Post, PostModel, TypesOfPost } from "./post";

export class PostDecorated extends Post{
    @prop({ref: ()=> Post})
    private post?: Ref<Post>;
}

export const PostBaseModel = getDiscriminatorModelForClass(PostModel, PostDecorated, TypesOfPost.PostDecorated);