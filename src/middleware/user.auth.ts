import { Response, NextFunction } from 'express';

import asyncHandler from '../helpers/asyncHandler';
import { PublicRequest } from 'app-request';

export function validateToken(req: PublicRequest, res: Response, next: NextFunction) {
  asyncHandler(async () => {
    req.token = req.headers['Authorization'].toString();
    return next();
  });
}
