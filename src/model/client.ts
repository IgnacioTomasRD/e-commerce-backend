import { Adress } from "./adress";
import { Post } from "./post";
import { ShoppingCart } from "./shoppingCart";
import { Transaction } from "./transaccion";

export class Client{
    private firstName?: string;
    private lastName?: string;
    private dni?: string;
    private birthDate?: Date;
    private favPost?: Post[];
    private shoppingCart?: ShoppingCart;
    private purchases?: Transaction[];
    private adress?: Adress[];
}