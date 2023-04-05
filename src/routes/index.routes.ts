import { Router } from 'express';
import loginRouter from './login.routes';

const indexRouter = Router();

indexRouter.get('/index', (req, res) => {
  res.send('Hola crack');
});

indexRouter.use(loginRouter);

export default indexRouter;




