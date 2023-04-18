import loginController from 'controllers/login.controller';
import { Router } from 'express';
import helperJWT from 'helpers/jwt.helper';

const loginRouter = Router();

loginRouter.post('/login', (req, res) => {
   loginController.login(req, res);
});

loginRouter.post('/logout', helperJWT.validateToken, (req, res) => {
  loginController.logout(req, res);
});


export default loginRouter;
