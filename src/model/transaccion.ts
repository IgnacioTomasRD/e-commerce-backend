import { Ref, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Bill } from "./bill";
import { Client } from "./client";
import { Item } from "./item";
import { TransactionStatus } from "./transactionStatus";

@modelOptions({schemaOptions: {collection: "transactions"}})
export class Transaction{
    @prop({ref: () => Item})
    private items?: Ref<Item>[];
    @prop({required: true})
    private totalPrice?: number;
    // @prop({ref: () => Client,required: true})
    // private client?: Ref<Client>;
    @prop({ref: () => Bill})
    private bill?: Ref<Bill>;
    @prop({ref: () => TransactionStatus, default: []})
    private transactionStatus?: Ref<TransactionStatus>[];
}

export const TransactionModel = getModelForClass(Transaction);