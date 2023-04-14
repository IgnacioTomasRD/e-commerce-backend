import { DocumentType, Ref, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Bill } from "./bill";
import { Item } from "./item";
import { TransactionStatus } from "./transactionStatus";

@modelOptions({schemaOptions: {collection: "transactions"}})
export class Transaction{
    @prop({ref: () => Item})
    private items?: Ref<Item>[];
    @prop({required: true})
    private totalPrice?: number;
    @prop({ref: () => Bill})
    private bill?: Ref<Bill>;
    @prop({ref: () => TransactionStatus, default: []})
    private transactionStatus!: Ref<TransactionStatus>[];

    public getAllTransactionStatus(){
        return this.transactionStatus;
    }

    public addStatus(newTransactionStatus: DocumentType<TransactionStatus>){
        this.transactionStatus.push(newTransactionStatus);
    }
    public getItemsRef(){
        return this.items;
    }

}

export const TransactionModel = getModelForClass(Transaction);