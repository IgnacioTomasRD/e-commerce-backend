import { Router } from 'express';
import loginRouter from './login.routes';
import registerRouter from './register.routes';
import productRouter from './product.routes';
import categoryRouter from './category.routes';

const indexRouter = Router();

indexRouter.get('/index', (req, res) => {
  res.send('Hola crack');
});

indexRouter.use(registerRouter);
indexRouter.use(loginRouter);
indexRouter.use(productRouter);
indexRouter.use(categoryRouter);

export default indexRouter;




