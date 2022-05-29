import { Request } from 'express';
import { ITokenData } from '../interfaces/ITokenData';

export type CustomRequest = Request & {
  tokenData: ITokenData;
};
