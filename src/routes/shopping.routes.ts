import { shoppingCartController } from '@controllers/shoppingCart.controller';
import { Router } from 'express';
import helperJWT from 'helpers/jwt.helper';

const shoppingCartRouter = Router();

shoppingCartRouter.get('/shoppingCart', helperJWT.validateToken, (req, res) => shoppingCartController.findAllItems(req, res));
shoppingCartRouter.post('/shoppingCart', helperJWT.validateToken, (req, res) => shoppingCartController.add(req, res));
shoppingCartRouter.delete('/shoppingCart/:itemId', helperJWT.validateToken, (req, res) => shoppingCartController.deleteItem(req, res));
export default shoppingCartRouter;
