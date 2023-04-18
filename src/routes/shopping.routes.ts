import { shoppingCartController } from '@controllers/shoppingCart.controller';
import { Router } from 'express';
import { helperAuth } from 'helpers/auth.helper';
import helperJWT from 'helpers/jwt.helper';
import { RolUser } from 'users/Rol';

const shoppingCartRouter = Router();


shoppingCartRouter.get('/shoppingCart', helperJWT.validateToken,helperAuth.authUser([RolUser.USER]), (req, res) => shoppingCartController.findAllItems(req, res));
shoppingCartRouter.post('/shoppingCart', helperJWT.validateToken,helperAuth.authUser([RolUser.USER]), (req, res) => shoppingCartController.add(req, res));
shoppingCartRouter.delete('/shoppingCart/:itemId', helperJWT.validateToken,helperAuth.authUser([RolUser.USER]), (req, res) => shoppingCartController.deleteItem(req, res));
shoppingCartRouter.post('/shoppingCart/buy', helperJWT.validateToken,helperAuth.authUser([RolUser.USER]), (req, res) => shoppingCartController.buy(req, res));
export default shoppingCartRouter;
