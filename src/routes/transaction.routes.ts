import { transactionController } from '@controllers/transaction.controller';
import { Router } from 'express';
import helperJWT from 'helpers/jwt.helper';

const transactionRouter = Router();

transactionRouter.get('/transaction/:transactionId', helperJWT.validateToken, (req, res) =>
  transactionController.findById(req, res)
);
transactionRouter.post('/transaction/:transactionId', helperJWT.validateToken, (req, res) =>
  transactionController.pay(req, res)
);
transactionRouter.post('/transaction/:transactionId/cancel', helperJWT.validateToken, (req, res) =>
  transactionController.cancelBuy(req, res)
);

export default transactionRouter;
