import { type Request, type Response } from 'express';
import userRepository from 'repositories/user.repository';
import helperJWT from 'helpers/jwt.helper';

const loginController = {
  login: function (req: Request, res: Response) {
    const { username, password } = req.body;

    const user = userRepository.getUserByUsernameAndPassword(username, password);
    if (user != null) {
      const accessToken = helperJWT.generateAccessToken(user.getUserName() + user.getPassword());
      res.header('authorization', accessToken);
      res.send(user);
    } else 
      res.send('username or password is incorrect');
  }
};

export default loginController;
