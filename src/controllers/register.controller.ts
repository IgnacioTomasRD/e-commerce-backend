import { Request, Response } from 'express';
import userRepository from 'repositories/user.repository';
import User from 'schemas/user.schema';

const registerController = {
  register: async function (req: Request, res: Response) {
    const { userName, password } = req.body;
    if (await userRepository.existsUserWithUserName(userName))
      return res.status(409).send('this username is being used');
    if (typeof userName === 'string' && typeof userName === 'string')
      {
      const user = new User(userName,password);
      user.save();
    }
  }
};

export default registerController;
