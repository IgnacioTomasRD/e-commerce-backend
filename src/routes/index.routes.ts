import { Router } from 'express';
import loginRouter from './login.routes';
import registerRouter from './register.routes';

const indexRouter = Router();

indexRouter.get('/index', (req, res) => {
  res.send('Hola crack');
});

indexRouter.use(registerRouter);
indexRouter.use(loginRouter);

export default indexRouter;




