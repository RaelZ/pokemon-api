import { DataTypes } from 'sequelize';
import { db } from '../db';

export const UserRolesModel = db.define('user_roles', {
  roleId: {
    type: DataTypes.UUID,
    references: {
      model: 'roles',
      key: 'id',
    },
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
    allowNull: false,
  },
});
