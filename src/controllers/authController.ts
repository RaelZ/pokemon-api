import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { UserModel } from '../database/models/UserModel';
import bcrypt from 'bcrypt';
import { RolesModel } from '../database/models/RolesModel';
import { UserRolesModel } from '../database/models/UserRolesModel';

class AuthController {
  auth = async (req: Request, res: Response) => {
    const { email, password, rememberMe } = req.body;

    const user = await UserModel.findOne({
      where: { email },
    }).then((loggedUser) => ({
      id: loggedUser.getDataValue('id'),
      password: loggedUser.getDataValue('passwordHash'),
    }));
    if (!user) return res.status(404).json({ error: 'NOT FOUND!' });

    const roleId = await UserRolesModel.findOne({
      where: { userId: user.id },
    }).then((loggedUser) => loggedUser.getDataValue('roleId'));
    if (!roleId) return res.status(404).json({ error: 'NOT FOUND!' });
    const role = await RolesModel.findOne({
      where: { id: roleId },
    }).then((loggedUser) => loggedUser.getDataValue('name'));

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'UNAUTHORIZED!' });

    const token = sign({ userId: user.id, role }, process.env.JWT_SECRET, {
      expiresIn: rememberMe ? '7d' : 20,
    });

    return res.status(200).json({ token });
  };
}

export default new AuthController();
