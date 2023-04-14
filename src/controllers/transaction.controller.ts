import { DocumentType } from '@typegoose/typegoose';
import { Request, Response } from 'express';
import { helperStock } from 'helpers/stock.helper';
import { helperTransaction } from 'helpers/transaction.helper';
import { Item } from 'model/item';
import { Transaction, TransactionModel } from 'model/transaccion';
import { TransactionStatusModel } from 'model/transactionStatus';
import { TypeOfStatusTransaction } from 'model/typeOfStatusTransaction';

export const transactionController = {
  async findById(req: Request, res: Response) {
    const transactionId = req.params.transactionId;
    const transaction = await TransactionModel.findById(transactionId);
    if (transaction) {
      await transaction.populate('items');
      await transaction.populate('transactionStatus');
      res.send(transaction);
    } else {
      res.send('transaction not found');
    }
  },
  async pay(req: Request, res: Response) {
    const transactionId = req.params.transactionId;
    const transaction = await TransactionModel.findById(transactionId);
    if (transaction) {
        const transactionStatus = await TransactionStatusModel.create({date: new Date(),typeOfStatus: TypeOfStatusTransaction.done,active:true});
        const items = await helperTransaction.getItemsOfTransaction(transaction.getItemsRef() as DocumentType<Item>[]);
        await helperStock.discountStockByItems(items);
        await helperTransaction.changeStatus(transactionStatus,transaction as DocumentType<Transaction>);
        await transaction.populate('transactionStatus');
        res.send(transaction)
    } else {
        res.send('transaction not found');
    }
  }
};
