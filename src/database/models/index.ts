import { RolesModel } from './RolesModel';
import { UserModel } from './UserModel';
import { UserRolesModel } from './UserRolesModel';

export const models = [RolesModel, UserModel];
export const modelsFK = [UserRolesModel];
