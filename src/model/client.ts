import { prop, mongoose, Ref, modelOptions, getModelForClass } from "@typegoose/typegoose";
import { Address } from "./adress";
import { Post } from "./post";
import { ShoppingCart } from "./shoppingCart";
import { Transaction } from "./transaccion";

export class Client{
    @prop({ required: true })
    private firstName?: string;
    @prop({ required: true })
    private lastName?: string;
    @prop({ required: true })
    private dni?: string;
    @prop({ required: true })
    private birthDate?: Date;
    @prop({ ref: () => Post, default: [] })
    private favPost?: mongoose.Types.Array<Post>;
    @prop({ type: () => ShoppingCart, default: new ShoppingCart()})
    private shoppingCart!: ShoppingCart;
    @prop({ ref: () => Transaction,default: []})
    private purchases?: Ref<Transaction>[];
    @prop({ _id: false, type: () => Address })
    private address!: Address;

    getShoppingCart(){
        return this.shoppingCart;
    }

    getFirstName(){
        return this.firstName;
    }

    getLastName(){
        return this.lastName;
    }

    getDni(){
        return this.dni;
    }

    getBirthDate(){
        return this.birthDate;
    }

    getAddress(){
        return this.address;
    }

    getPurchases(){
        return this.purchases;
    }
}

export const ClientModel = getModelForClass(Client);