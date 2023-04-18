import { NextFunction, Request, Response } from 'express';
import { RolUser } from 'users/Rol';
import { UserModel } from 'users/User';
import { Message } from 'utils/message';

export const helperAuth = {
  authUser: (rols: RolUser[]) =>
    async function (req: Request, res: Response, next: NextFunction) {
      const userId = res.locals.userId;
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send(Message.USER_NOT_FOUND);
      }
      if (rols.includes(user.getRol())) {
        return next();
      } else {
        return res.status(403).send(Message.NOT_AUTHORIZED);
      }
    }
};
