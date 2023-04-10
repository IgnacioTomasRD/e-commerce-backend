import { Category } from "./category";
import { Characteristics } from "./characteristics";

export class Product{
    private name?: string;
    private description?: string;
    private category?: Category[];
    private characteristics?: Characteristics[];
    private imgs?: string[];
}