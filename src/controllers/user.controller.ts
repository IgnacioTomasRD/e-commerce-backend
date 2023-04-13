import { Request, Response } from 'express';
import { Address } from 'model/adress';
import { User, UserModel } from 'users/User';

const userController = {
  profile: async function (req: Request, res: Response) {
    const id = res.locals.userId;
    let user = await UserModel.findById(id);
    if (user) {
      const userDTO = createUserDTO(user);
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
    const userDTO = createUserDTO(user);
    return res.status(200).send(userDTO);
  },
  editClient: async function (req: Request, res: Response) {
    const id = res.locals.userId;
    const updates = req.body;
    const options = { new: true };

    const user = await UserModel.findOneAndUpdate({ _id: id }, { client: updates }, options);

    if (!user) {
      return res.status(404).json('User not found');
    }
    const userDTO = createUserDTO(user);
    return res.status(200).send(userDTO);
  },
  editAddress: async function (req: Request, res: Response) {
    const id = res.locals.userId;
    const updates = req.body;
    const options = { new: true };

    const user = await UserModel.findOneAndUpdate({ _id: id }, { 'client.address': updates }, options);

    if (!user) {
      return res.status(404).json('User not found');
    }

    const userDTO = createUserDTO(user);
    return res.status(200).send(userDTO);
  },
  purchases: async function (req: Request, res: Response) {
    const id = res.locals.userId;
    const user = await UserModel.findById(id);
    if (user) {
      res.send(user.getClient().getPurchases());
    } else {
      res.send('user not found');
    }
  }
};

function createUserDTO(user: any) {
  const userName = user.getUserName();
  const password = user.getPassword();
  const firstName = user.getClient().getFirstName();
  const lastName = user.getClient().getLastName();
  const birthDate = user.getClient().getBirthDate();
  const dni = user.getClient().getDni();
  const address = user.getClient().getAddress();

  return { userName, password, client: { firstName, lastName, dni, birthDate, address } };
}

export default userController;
