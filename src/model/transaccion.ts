import { Bill } from "./bill";
import { Client } from "./client";
import { Item } from "./item";
import { TransactionStatus } from "./transactionStatus";

export class Transaction{
    private items?: Item[];
    private totalPrice?: number;
    private cliente?: Client;
    private bill?: Bill;
    private transactionStatus?: TransactionStatus[];
}