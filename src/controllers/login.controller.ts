import { type Request, type Response } from 'express';
import helperJWT, { tokenBlackList } from 'helpers/jwt.helper';
import { UserModel } from 'users/User';

const loginController = {
  login: async function (req: Request, res: Response) {
    const { userName, password } = req.body;

    const user = await this.getUserByUsernameAndPassword(userName, password);
    if (user != null) {
      const accessToken = helperJWT.generateAccessToken({ userId: user._id });
      res.cookie('authorization', accessToken);
      res.send(user);
    } else res.send('username or password is incorrect');
  },

  getUserByUsernameAndPassword: async function (userName: string, password: string) {
    return await UserModel.findOne({ userName: userName, password: password });
  },

  logout: function (req: Request, res: Response) {
    const token = req.headers['authorization'];
    if(token!= undefined)
    {
      tokenBlackList.push(token);
      // res.clearCookie;
      res.send("log out succesful");
    } 
  }
};

export default loginController;
