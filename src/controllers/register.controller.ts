import { Request, Response } from 'express';
import { UserModel } from 'users/User';

const registerController = {
  register: async function (req: Request, res: Response) {
    const { userName, password } = req.body;

    if (await this.existsUserWithUserName(userName)) return res.status(409).send('this username is being used');

    const newUser = await UserModel.create({ userName, password });
    await newUser.save();

    return res.status(201).send('Usuario creado con exito creo');
  },

  existsUserWithUserName: async function (userName: string) {
    return await UserModel.findOne({ userName: userName });
  }
};

export default registerController;
