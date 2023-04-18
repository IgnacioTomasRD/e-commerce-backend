import { type Request, type Response } from 'express';
import { helperCrypt } from 'helpers/crypt.helper';
import helperJWT, { tokenBlackList } from 'helpers/jwt.helper';
import { UserModel } from 'users/User';
import { Message } from 'utils/message';

const loginController = {
  login: async function (req: Request, res: Response) {
    const { userName, password } = req.body;
    const user = await this.getUserByUsername(userName);
    if (user != null && (await helperCrypt.compare(password,user.getPassword()))) {
      const accessToken = helperJWT.generateAccessToken({ userId: user._id });
      res.cookie('authorization', accessToken,{httpOnly: true});
      res.status(200).send(user);
    } else res.status(404).send(Message.USER_OR_PASSWORD_INCORRECT);
  },

  getUserByUsername: async function (userName: String) {
    return await UserModel.findOne({userName: userName});
  },

  logout: function (req: Request, res: Response) {
    const token = req.cookies['authorization'];
    if(token!= undefined)
    {
      res.clearCookie('authorization');
      res.status(200).send(Message.LOG_OUT_SUCCESFUL);
    } else {
      res.status(404).send(Message.NOT_AUTHORIZED);
    }
  }
};

export default loginController;
