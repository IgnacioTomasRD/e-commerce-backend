import { DocumentType, Ref } from '@typegoose/typegoose';
import { Client } from 'model/client';
import { Item, ItemModel } from 'model/item';
import { ShoppingCart } from 'model/shoppingCart';
import { Transaction, TransactionModel } from 'model/transaccion';
import { TransactionStatus, TransactionStatusModel } from 'model/transactionStatus';
import { TypeOfStatusTransaction } from 'model/typeOfStatusTransaction';

export const helperTransaction = {
  generateTransaction: async function (client: Client, items: Item[]) {
    const totalPrice = items.map((i) => i.getPrice() * i.getAmount()).reduce((total, num) => total + num, 0);
    const transactionStatus = await TransactionStatusModel.create({
      date: new Date(),
      typeOfStatus: TypeOfStatusTransaction.pending,
      active: true
    });
    const transaction = await TransactionModel.create({
      client,
      items,
      totalPrice,
      transactionStatus: transactionStatus._id
    });
    return transaction;
  },
  changeStatus: async function (newStatus: DocumentType<TransactionStatus>, transaction: DocumentType<Transaction>) {
    const transactionStatusList = transaction.getAllTransactionStatus();
    for (const status of transactionStatusList) {
      await TransactionStatusModel.findByIdAndUpdate(status._id, { active: false },{ new: true });
    }
    transaction.addStatus(newStatus);
    await transaction.save();
  },
  getItemsOfTransaction: async function(itemsRef: Ref<Item>[]){
    const items = [];
    for (let itemRef of itemsRef) {
      let item = await ItemModel.findById(itemRef._id);
      if (item) items.push(item as DocumentType<Item>);
    }
    return items;
  }
};
