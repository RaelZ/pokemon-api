import { DataTypes } from 'sequelize';
import { db } from '../db';

export const RolesModel = db.define('roles', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  normalizedName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
