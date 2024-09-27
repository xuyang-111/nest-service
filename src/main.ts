import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalInterceptor } from './global.interceptor';
import { AllExceptionsFilter } from './exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 添加swagger相关配置

  const config = new DocumentBuilder()
    .setTitle('Swagger 接口文档')
    .setDescription('这个是基于nestjs编写的接口文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // 应用全局拦截器
  app.useGlobalInterceptors(new GlobalInterceptor());

  // 注册全局异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3000);
}
bootstrap();
