import { Request, Response } from 'express';
import { helperCrypt } from 'helpers/crypt.helper';
import { AddressModel } from 'model/adress';
import { ClientModel } from 'model/client';
import { RolUser } from 'users/Rol';
import { UserModel } from 'users/User';
import { Message } from 'utils/message';

const registerController = {
  register: async function (req: Request, res: Response) {
    const { email, password } = req.body;
    if (await this.existsUserWithEmail(email)) return res.status(409).send('this email is being used');
    const { firstName, lastName, dni, birthDate } = req.body.client;
    const { street, number, extraDescription, locality, province } = req.body.client.address;

    const address = await AddressModel.create({ street, number, extraDescription, locality, province });
    const client = await ClientModel.create({ firstName, lastName, dni, birthDate, address });
    await client.save();
    const passwordHash = await helperCrypt.encrypt(password);
    const newUser = await UserModel.create({ email, password: passwordHash,rol: RolUser.USER, client: client._id });
    await newUser.save();

    return res.status(201).send(Message.USER_REGISTER_SUCCES);
  },

  existsUserWithEmail: async function (email: string) {
    return await UserModel.findOne({ email: email });
  }
};

export default registerController;
