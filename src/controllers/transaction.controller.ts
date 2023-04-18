import { DocumentType } from '@typegoose/typegoose';
import { Request, Response } from 'express';
import { helperStock } from 'helpers/stock.helper';
import { helperTransaction } from 'helpers/transaction.helper';
import { ClientModel } from 'model/client';
import { Item } from 'model/item';
import { Transaction, TransactionModel } from 'model/transaccion';
import { TransactionStatusModel } from 'model/transactionStatus';
import { TypeOfStatusTransaction } from 'model/typeOfStatusTransaction';
import { UserModel } from 'users/User';
import { Message } from 'utils/message';

export const transactionController = {
  async findById(req: Request, res: Response) {
    const transactionId = req.params.transactionId;
    const transaction = await TransactionModel.findById(transactionId);
    if (transaction) {
      await transaction.populate('items');
      await transaction.populate('transactionStatus');
      res.status(200).send(transaction);
    } else {
      res.status(404).send(Message.TRANSACTION_NOT_FOUND);
    }
  },
  async pay(req: Request, res: Response) {
    const user = await UserModel.findById(res.locals.userId);
    if (!user) {
      return res.status(404).send(Message.USER_NOT_FOUND);
    }
    const client = await ClientModel.findById(user.getClientId());
    if (!client) {
      return res.status(404).send(Message.CLIENT_NOT_FOUND);
    }
    const transactionId = req.params.transactionId;
    const transaction = await TransactionModel.findById(transactionId);
    if (!transaction) {
      res.status(404).send(Message.TRANSACTION_NOT_FOUND);
    } else {
      const items = await helperTransaction.getItemsOfTransaction(transaction.getItemsRef() as DocumentType<Item>[]);
      try {
        await helperStock.discountStockByItems(items);
        const transactionStatus = await TransactionStatusModel.create({
          date: new Date(),
          typeOfStatus: TypeOfStatusTransaction.done,
          active: true
        });
        await helperTransaction.changeStatus(transactionStatus, transaction as DocumentType<Transaction>);
        client.getShoppingCart().clearItems();
        await client.save();
        await transaction.populate('transactionStatus');
        res.status(200).send(transaction);
      } catch (error:any) {
        res.status(500).send(error.message)
      }
    }
  },

  async cancelBuy(req: Request, res: Response) {
    const transactionId = req.params.transactionId;
    const transaction = await TransactionModel.findById(transactionId);
    if (transaction) {
      const newTransactionStatus = await TransactionStatusModel.create({
        date: new Date(),
        typeOfStatus: TypeOfStatusTransaction.canceled,
        active: true
      });
      await helperTransaction.changeStatus(newTransactionStatus, transaction as DocumentType<Transaction>);
      await transaction.populate('transactionStatus');
      res.status(200).send(transaction);
    } else {
      res.status(404).send(Message.TRANSACTION_NOT_FOUND);
    }
  }
};
