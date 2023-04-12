import { Ref, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Item } from "./item";
import { Post } from "./post";

@modelOptions({schemaOptions: {collection: "shippingCart"}})
export class ShoppingCart{
    @prop({ref: () => Item, default: []})
    private items!: Ref<Item>[];

    add(itemId: Ref<Item>): void{
        this.items.push(itemId);
    }
    delete(itemId: Ref<Item>): void {
        console.log(itemId);
        console.log();
        this.items.forEach(i => console.log(i.toString() ===  itemId.toString()));
        this.items = this.items.filter(i => i.toString() !== itemId.toString())
    }
}

export const ShoppingCartModel = getModelForClass(ShoppingCart);