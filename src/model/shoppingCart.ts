import { Ref, prop } from "@typegoose/typegoose";
import { Item } from "./item";

export class ShoppingCart{
    @prop({ref: () => Item, default: []})
    private items!: Ref<Item>[];

    add(itemId: Ref<Item>): void{
        this.items.push(itemId);
    }
    delete(itemId: Ref<Item>): void {
        this.items = this.items.filter(i => i.toString() !== itemId.toString())
    }

    getItems(){
        return this.items;
    }

    clearItems(){
        this.items = []
    }
}