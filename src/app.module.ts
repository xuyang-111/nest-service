import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import * as dataBase from '../dataBaseConfig.json';
import { APP_PIPE } from '@nestjs/core';

const path = require('path');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataBase,
      entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
    } as TypeOrmModuleOptions),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      transform: true, // 自动转换类型
      validateCustomDecorators: true, // 校验自定义装饰器
    }),

  }],
})
export class AppModule {}
