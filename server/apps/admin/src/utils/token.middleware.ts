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

    const SECRET = process.env.SECRET;
    try {
      const token = headers.authorization.split(' ')[1];
      const userInfo = jwt.verify(token, SECRET);
      console.log(userInfo);
      next();
    } catch (error) {
      // 未经授权提示
      return res.status(HttpStatus.UNAUTHORIZED).json([]);
    }
  }
}
