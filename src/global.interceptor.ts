// global.interceptor.ts
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
   
  @Injectable()
  export class GlobalInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map(data => {
          // 统一的数据格式
          return {
            code: 0,
            message: 'success',
            data: data,
          };
        }),
      );
    }
  }