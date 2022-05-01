import {
  BadRequestException,
  HttpCode,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import success from './common-res';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;
    const token = headers.authorization.split(' ')[1];
    const SECRET = process.env.SECRET;
    try {
      jwt.verify(token, SECRET);
      next();
    } catch (error) {
      // 未经授权提示
      return res.status(HttpStatus.UNAUTHORIZED).json([]);
    }
  }
}
