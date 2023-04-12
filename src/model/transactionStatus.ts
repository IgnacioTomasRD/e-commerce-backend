import { modelOptions, prop } from "@typegoose/typegoose";
import { TypeOfStatusTransaction } from "./typeOfStatusTransaction";

@modelOptions({schemaOptions: {collection: "transactionsStatus"}})
export class TransactionStatus{
    @prop({required: true})
    private date?: Date;
    @prop({enum: TypeOfStatusTransaction})
    private typeOfStatus?: TypeOfStatusTransaction;
    @prop({required: true})
    private active?: boolean;

    public isActive(this: TransactionStatus) {
        return this.active;
      }
}