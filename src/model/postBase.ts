import { Post } from "../interfaces/post";
import { Product } from "./product";
import { StatusPost } from "./statusPost";


export class PostBase implements Post{
    private product?: Product;
    private name?: string;
    private description?: string;
    private price?: number;
    private stock?: number;
    private states?: StatusPost[];
}