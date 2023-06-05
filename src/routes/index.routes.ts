import { Router } from 'express';
import loginRouter from './login.routes';
import registerRouter from './register.routes';
import productRouter from './product.routes';
import categoryRouter from './category.routes';
import postRouter from './post.routes';
import shoppingCartRouter from './shopping.routes';
import userRouter from './user.routes';
import transactionRouter from './transaction.routes';

const indexRouter = Router();

indexRouter.use(registerRouter);
indexRouter.use(loginRouter);
indexRouter.use(productRouter);
indexRouter.use(categoryRouter);
indexRouter.use(postRouter);
indexRouter.use(shoppingCartRouter);
indexRouter.use(userRouter);
indexRouter.use(transactionRouter);

export default indexRouter;




