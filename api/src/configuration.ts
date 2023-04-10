import { App, Configuration, ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import * as egg from '@midwayjs/web';
import * as view from '@midwayjs/view-ejs';
import * as jwt from '@midwayjs/jwt';
import { JwtMiddleware } from './middleware';
import {
  DefaultErrorFilter,
  UnauthorizedErrorFilter,
  BadRequestErrorFilter,
  NotFoundErrorFilter,
} from './filter';

@Configuration({
  imports: [egg, view, jwt],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {
    // 添加中间件
    this.app.useMiddleware([
      //

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
