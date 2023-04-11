import { Post } from "./post";
import { Product } from "./product";
import { StatusPost } from "./statusPost";


export class PostBase extends Post{
    private product?: Product;
    private name?: string;
    private description?: string;
    private price?: number;
    private stock?: number;
    private states?: StatusPost[];
}