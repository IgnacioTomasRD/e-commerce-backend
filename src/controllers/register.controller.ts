import { Request, Response } from 'express';
import { AddressModel } from 'model/adress';
import { ClientModel } from 'model/client';
import { UserModel } from 'users/User';

const registerController = {
  register: async function (req: Request, res: Response) {
    const { userName, password } = req.body;
    if (await this.existsUserWithUserName(userName)) return res.status(409).send('this username is being used');
    const {
      firstName,
      lastName,
      dni,
      birthDate
    } = req.body.client;
    const {
      street,
      number,
      extraDescription,
      locality,
      province
    } = req.body.client.address;
    
    const address = await AddressModel.create({street,number,extraDescription,locality,province});
    const client = await ClientModel.create({firstName,lastName,dni,birthDate,address});
    await client.save();

    const newUser = await UserModel.create({ userName, password,client: client._id});
    await newUser.save();

    return res.status(201).send('Usuario creado con exito creo');
  },

  existsUserWithUserName: async function (userName: string) {
    return await UserModel.findOne({ userName: userName });
  }
};

export default registerController;
