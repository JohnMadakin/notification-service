import { Request } from 'express';
import User from '../database/model/User';

declare interface PublicRequest extends Request {
  user: User;
  token?: string;
}

declare interface ProtectedRequest extends PublicRequest {
  apiKey: string;
  user: User;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
