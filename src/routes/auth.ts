import express from 'express';
import authController from '../controllers/authController';

const auth = express.Router();

auth.post('/auth', authController.auth);

export { auth };
