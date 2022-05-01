import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import * as jwt from 'jsonwebtoken';

// token拦截器
@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const headers = context.switchToHttp().getRequest().headers;
    const token = headers.authorization.split(' ')[1];
    const SECRET = process.env.SECRET;

    try {
      jwt.verify(token, SECRET);
      return next.handle().pipe(tap());
    } catch (error) {
      // TODO 这里暂时不能解决，但是保错不影响代码执行
      // TODO 使用拦截器，不可以排除某些路径
      // TODO 使用中间件
      // TODO 使用内置的AUTH token
      // return success(40001, 'token过期了，请重新登录');
    }
  }
}
