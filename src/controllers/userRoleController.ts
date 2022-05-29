import { Response } from 'express';
import { RolesModel } from '../database/models/RolesModel';
import { UserRolesModel } from '../database/models/UserRolesModel';
import { CustomRequest } from '../types/CustomRequest';

class UserRoleController {
  async findAll(req: CustomRequest, res: Response) {
    const role = req.tokenData.role;

    if (role !== 'ADMIN')
      return res.status(401).json({ error: 'Unauthorized.' });

    return await UserRolesModel.findAll()
      .then((roles) =>
        roles.length > 0
          ? res.status(200).json(roles)
          : res.status(204).json(roles)
      )
      .catch((err) => res.status(400).json(err));
  }

  async create(req: CustomRequest, res: Response) {
    const { userId } = req.params;
    const role = req.tokenData.role;

    if (role !== 'ADMIN')
      return res.status(401).json({ error: 'Unauthorized.' });

    const newUserRole = await RolesModel.findOne({
      where: { name: 'STANDARD' },
    }).then((standard) => standard.getDataValue('id'));

    if (!newUserRole)
      return res.status(400).json({ error: 'Standard role not found.' });

    return await UserRolesModel.create({ roleId: newUserRole, userId })
      .then((roles) => res.status(201).json(roles))
      .catch((err) => res.status(400).json(err));
  }

  async update(req: CustomRequest, res: Response) {
    const { roleId, userId } = req.params;
    const role = req.tokenData.role;

    if (role !== 'ADMIN')
      return res.status(401).json({ error: 'Unauthorized.' });

    return await UserRolesModel.update({ roleId }, { where: { userId } })
      .then((roles) => res.status(200).json(roles))
      .catch((err) => res.status(400).json(err));
  }

  async delete(req: CustomRequest, res: Response) {
    const { userId } = req.params;
    const role = req.tokenData.role;

    if (role !== 'ADMIN')
      return res.status(401).json({ error: 'Unauthorized.' });

    return await UserRolesModel.destroy({ where: { userId } })
      .then((roles) => res.status(200).json(roles))
      .catch((err) => res.status(400).json(err));
  }
}

export default new UserRoleController();
