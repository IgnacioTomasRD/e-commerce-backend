import { getModelForClass, DocumentType, modelOptions, prop } from '@typegoose/typegoose';
import { TypeOfStatusPost } from './typeOfStatusPost';

@modelOptions({ schemaOptions: { collection: 'statusPosts' } })
export class PostStatus {
  @prop({ ref: () => Date })
  private date?: Date;
  @prop({ enum: TypeOfStatusPost })
  private typeOfStatusPost?: TypeOfStatusPost;
  @prop()
  public active!: boolean;

  constructor(typeOfStatusPost: TypeOfStatusPost) {
    this.typeOfStatusPost = typeOfStatusPost;
    this.date = new Date();
    this.active = true;
  }
  public isActive(this: PostStatus) {
    return this.active;
  }
}

export const StatusPostModel = getModelForClass(PostStatus);
