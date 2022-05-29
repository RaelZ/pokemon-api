import { Response } from 'express';
import { RolesModel } from '../database/models/RolesModel';
import { CustomRequest } from '../types/CustomRequest';

class RoleController {
  async findAll(req: CustomRequest, res: Response) {
    const role = req.tokenData.role;

    if (role !== 'ADMIN')
      return res.status(401).json({ error: 'Unauthorized.' });

    return await RolesModel.findAll()
      .then((roles) =>
        roles.length > 0
          ? res.status(200).json(roles)
          : res.status(204).json(roles)
      )
      .catch((err) => res.status(400).json(err));
  }

  async create(req: CustomRequest, res: Response) {
    const { name, normalizedName } = req.body;
    const role = req.tokenData.role;

    if (role !== 'ADMIN')
      return res.status(401).json({ error: 'Unauthorized.' });

    return await RolesModel.create({ name, normalizedName })
      .then((roles) => res.status(201).json(roles))
      .catch((err) => res.status(400).json(err));
  }

  async update(req: CustomRequest, res: Response) {
    const roleId = req.params.roleId;
    const { name, normalizedName } = req.body;
    const role = req.tokenData.role;

    if (role !== 'ADMIN')
      return res.status(401).json({ error: 'Unauthorized.' });

    return await RolesModel.update(
      { name, normalizedName },
      { where: { id: roleId } }
    )
      .then((roles) => res.status(200).json(roles))
      .catch((err) => res.status(400).json(err));
  }

  async delete(req: CustomRequest, res: Response) {
    const roleId = req.params.roleId;
    const role = req.tokenData.role;

    if (role !== 'ADMIN')
      return res.status(401).json({ error: 'Unauthorized.' });

    return await RolesModel.destroy({ where: { id: roleId } })
      .then((roles) => res.status(200).json(roles))
      .catch((err) => res.status(400).json(err));
  }
}

export default new RoleController();
