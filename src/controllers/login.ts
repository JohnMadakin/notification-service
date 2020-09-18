import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../helpers/asyncHandler';
import LoginService from '../services/login';
import { SuccessResponse } from '../helpers/ApiResponse';

export default function Login(req: Request, res: Response, next: NextFunction) {
  asyncHandler(async (req, res) => {
    const { token } = await LoginService(req.body);
    new SuccessResponse('Login Success', {
      token,
    }).send(res);
  });
}
