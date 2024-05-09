import { App, Configuration, ILifeCycle } from '@midwayjs/core';
import { join } from 'path';
import * as egg from '@midwayjs/web';
import * as view from '@midwayjs/view-ejs';
import * as jwt from '@midwayjs/jwt';
import * as validate from '@midwayjs/validate';
import * as upload from '@midwayjs/upload';
import * as staticFile from '@midwayjs/static-file';
import * as crossDomain from '@midwayjs/cross-domain';
import * as swagger from '@midwayjs/swagger';
import { JwtMiddleware } from './middleware';
import {
  DefaultErrorFilter,
  UnauthorizedErrorFilter,
  BadRequestErrorFilter,
  NotFoundErrorFilter,
} from './filter';

@Configuration({
  imports: [
    egg,
    view,
    jwt,
    validate,
    upload,
    staticFile,
    crossDomain,
    {
      // 只在 local 环境下启用
      component: swagger,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: egg.Application;

  async onReady() {
    // 添加中间件
    this.app.useMiddleware([
      // 导入upload时 eslint 报错、暂时使用any替换

      JwtMiddleware,
    ]);
    this.app.useFilter([
      DefaultErrorFilter,
      UnauthorizedErrorFilter,
      BadRequestErrorFilter,
      NotFoundErrorFilter,
    ]);
  }
}
