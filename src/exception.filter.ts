/**
 * 全局异常处理
 */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import * as dayjs from 'dayjs'; 


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR; 
    const errorResponse: any = {
      code: status,
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      path: request.url,
      method: request.method,
    };
     
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      errorResponse.message = 'Internal server error';
      // 可以在这里记录异常信息到日志
    } else {
      errorResponse.message = exception.response?.message ?? exception.message;
    }
 
    response.status(status).json(errorResponse);
  }
}