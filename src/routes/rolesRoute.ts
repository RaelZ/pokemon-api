import express from 'express';
import RoleController from '../controllers/roleController';
import { isAuth } from '../middlewares/isAuth';

const role = express.Router();

role.post('/roles', isAuth, RoleController.create);
role.get('/roles', isAuth, RoleController.findAll);
role.put('/roles/:roleId', isAuth, RoleController.update);
role.delete('/roles/:roleId', isAuth, RoleController.delete);

export { role };
