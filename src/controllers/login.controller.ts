import { type Request, type Response } from 'express';
import { helperCrypt } from 'helpers/crypt.helper';
import helperJWT, { tokenBlackList } from 'helpers/jwt.helper';
import { ClientModel } from 'model/client';
import { UserModel } from 'users/User';
import { Message } from 'utils/message';

const loginController = {
  login: async function (req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.getUserByEmail(email);
    if (user != null && (await helperCrypt.compare(password,user.getPassword()))) {
      const accessToken = helperJWT.generateAccessToken({ userId: user._id });
      res.cookie('authorization', accessToken);
      const client = await ClientModel.findById(user.getClientId());
      const userToSend = {userId: user._id ,firstName: client?.getFirstName(), lastName: client?.getLastName()};
      res.status(200).send(userToSend);
    } else res.status(404).send(Message.USER_OR_PASSWORD_INCORRECT);
  },

  getUserByEmail: async function (email: String) {
    return await UserModel.findOne({email: email});
  },

  logout: function (req: Request, res: Response) {
    const token = req.cookies['authorization'];
    if(token!== undefined)
    {
      res.clearCookie('authorization');
      res.status(200).send({status: Message.LOG_OUT_SUCCESFUL});
    } else {
      res.status(404).send({status: Message.LOG_OUT_SUCCESFUL});
    }
  }
};

export default loginController;
