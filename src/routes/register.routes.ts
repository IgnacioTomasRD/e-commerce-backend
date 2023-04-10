import registerController from '@controllers/register.controller';
import { Router } from 'express';

const registerRouter = Router();
registerRouter.post('/register', (req,res) =>registerController.register(req,res));

export default registerRouter;