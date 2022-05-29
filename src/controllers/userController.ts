import { Request, Response } from 'express';
import { UserModel } from '../database/models/UserModel';
import bcrypt from 'bcrypt';
import { strongPassword } from '../functions/users/strongPassword';
import { findByEmailOrCPF } from '../functions/users/findEmailOrCPF';
import { CustomRequest } from '../types/CustomRequest';
import { RolesModel } from '../database/models/RolesModel';
import { UserRolesModel } from '../database/models/UserRolesModel';

class UserController {
  async findAll(req: CustomRequest, res: Response) {
    return await UserModel.findAll({
      where: {
        deleted: false,
      },
    })
      .then((users) =>
        users.length > 0
          ? res.status(200).json(users)
          : res.status(204).json(users)
      )
      .catch((err) => res.status(400).json(err));
  }

  async findOne(req: Request, res: Response) {
    const userId = req.params.userId;
    return await UserModel.findOne({
      where: {
        id: userId,
      },
    })
      .then((user) =>
        user
          ? res.status(200).json(user)
          : res.status(404).json({ user: 'NOT FOUND!' })
      )
      .catch((err) => res.status(400).json(err));
  }

  async create(req: Request, res: Response) {
    const { firstName, lastName, nickname, email, password, cpf } = req.body;
    const hasEmailOrCPF = await findByEmailOrCPF(email, cpf);
    const hasStrong = strongPassword(
      firstName,
      lastName,
      nickname,
      email,
      password
    );

    if (hasEmailOrCPF)
      return res.status(400).json({ error: 'Email or CPF already exists!' });
    if (!hasStrong)
      return res.status(400).json({
        error:
          'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character and must be at least 8 characters long. Password must not contain the user name, first name, last name, nickname or email.',
      });

    const passwordHash = await bcrypt.hash(password, 10);

    return await UserModel.create({
      firstName,
      lastName,
      nickname,
      email,
      passwordHash,
      cpf,
    })
      .then(async (user) => {
        const newUserRole = await RolesModel.findOne({
          where: { name: 'STANDARD' },
        }).then((standard) => standard.getDataValue('id'));
        const newUserId = user.getDataValue('id');

        if (!newUserRole)
          return res.status(400).json({ error: 'Standard role not found.' });

        await UserRolesModel.create({
          roleId: newUserRole,
          userId: newUserId,
        });
        return res.status(201).json(user);
      })
      .catch((err) => res.status(400).json(err));
  }

  async update(req: Request, res: Response) {
    const userId = req.params.userId;
    return await UserModel.update(req.body, {
      where: {
        id: userId,
      },
    })
      .then((user) =>
        user ? res.status(200).json(user) : res.status(204).json(user)
      )
      .catch((err) => res.status(400).json(err));
  }

  async delete(req: Request, res: Response) {
    const userId = req.params.userId;
    return await UserModel.update(
      {
        deleted: true,
      },
      {
        where: {
          id: userId,
        },
      }
    )
      .then((user) =>
        user ? res.status(200).json(user) : res.status(204).json(user)
      )
      .catch((err) => res.status(400).json(err));
  }

  async destroy(req: Request, res: Response) {
    const userId = req.params.userId;
    await UserRolesModel.destroy({
      where: {
        userId,
      },
    });
    return await UserModel.destroy({
      where: {
        id: userId,
      },
    })
      .then((user) => res.status(204).json(user))
      .catch((err) => res.status(400).json(err));
  }
}

export default new UserController();
