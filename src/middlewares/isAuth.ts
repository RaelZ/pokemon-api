import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { CustomRequest } from '../types/CustomRequest';

export const isAuth = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const validToken: any = verify(token, process.env.JWT_SECRET);
    req.tokenData = validToken;
    next();
  } catch {
    res.status(401).json('Unauthorized.');
  }
};
