import { DocumentType } from '@typegoose/typegoose';
import { Request, Response } from 'express';
import { Address } from 'model/adress';
import { ClientModel } from 'model/client';
import { User, UserModel } from 'users/User';

const userController = {
  profile: async function (req: Request, res: Response) {
    const id = res.locals.userId;
    let user = await UserModel.findById(id);
    if (user) {
      const userDTO = await createUserDTO(user as DocumentType<User>);
      res.send(userDTO);
    } else {
      res.send('usuario no encontrado');
    }
  },
  edit: async function (req: Request, res: Response) {
    const id = res.locals.userId;
    const updates = req.body;
    const options = { new: true };

    const user = await UserModel.findOneAndUpdate({ _id: id }, updates, options);

    if (!user) {
      return res.status(404).json('User not found');
    }
    const userDTO = await createUserDTO(user as DocumentType<User>);
    return res.status(200).send(userDTO);
  },
  purchases: async function (req: Request, res: Response) {
    const id = res.locals.userId;
    const user = await UserModel.findById(id);
    if (user) {
      const client = await ClientModel.findById(user.getClientId());
      if (client) {
        res.send(client.getPurchases());
      } else {
        res.send('el cliente no se ha encontrado');
      }
    } else {
      res.send('user not found');
    }
  }
};

async function createUserDTO(user: User) {
  const userName = user.getUserName();
  const password = user.getPassword();
  const client = await ClientModel.findById(user.getClientId());
  if (client) {
    const firstName = client.getFirstName();
    const lastName = client.getLastName();
    const birthDate = client.getBirthDate();
    const dni = client.getDni();
    const address = client.getAddress();
    return { userName, password, client: { firstName, lastName, dni, birthDate, address } };
  } else{
    throw new Error("no se ha encontrado el cliente");
  }
}

export default userController;
