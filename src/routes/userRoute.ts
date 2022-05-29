import express from 'express';
import UserController from '../controllers/userController';
import { isAuth } from '../middlewares/isAuth';

const user = express.Router();

user.post('/users', UserController.create);
user.get('/users', isAuth, UserController.findAll);
user.get('/users/:userId', isAuth, UserController.findOne);
user.put('/users/:userId', isAuth, UserController.update);
user.put('/users/soft/:userId', isAuth, UserController.delete);
user.delete('/users/:userId', isAuth, UserController.destroy);

export { user };
