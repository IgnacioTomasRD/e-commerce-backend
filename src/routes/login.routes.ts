import loginController from 'controllers/login.controller';
import { Router } from 'express';
import helperJWT from 'helpers/jwt.helper';

const loginRouter = Router();

loginRouter.get('/login', (req, res) => {
  res.send('hola campeon entraste al login que te parece');
});

loginRouter.post('/login', (req, res) => {
  loginController.login(req, res);
});

loginRouter.get('/rutaAutenticada', helperJWT.validateToken, (req, res) => res.send('todo OK'));

export default loginRouter;
