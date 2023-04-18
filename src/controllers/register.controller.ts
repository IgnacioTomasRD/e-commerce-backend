import { Request, Response } from 'express';
import { helperCrypt } from 'helpers/crypt.helper';
import { AddressModel } from 'model/adress';
import { ClientModel } from 'model/client';
import { RolUser } from 'users/Rol';
import { UserModel } from 'users/User';
import { Message } from 'utils/message';

const registerController = {
  register: async function (req: Request, res: Response) {
    const { userName, password } = req.body;
    if (await this.existsUserWithUserName(userName)) return res.status(409).send('this username is being used');
    const { firstName, lastName, dni, birthDate } = req.body.client;
    const { street, number, extraDescription, locality, province } = req.body.client.address;

    const address = await AddressModel.create({ street, number, extraDescription, locality, province });
    const client = await ClientModel.create({ firstName, lastName, dni, birthDate, address });
    await client.save();
    const passwordHash = await helperCrypt.encrypt(password);
    const newUser = await UserModel.create({ userName, password: passwordHash,rol: RolUser.USER, client: client._id });
    await newUser.save();

    return res.status(201).send(Message.USER_REGISTER_SUCCES);
  },

  existsUserWithUserName: async function (userName: string) {
    return await UserModel.findOne({ userName: userName });
  }
};

export default registerController;
