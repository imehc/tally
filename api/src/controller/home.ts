import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from 'egg';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/')
  async home() {
    await this.ctx.render('index', { title: '哈哈哈哈' });
  }
}
