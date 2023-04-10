import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from 'egg';

@Controller('/v1/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/')
  async home() {
    // const posts = await prisma.post.findMany({
    //   where: { published: true },
    //   include: { author: true },
    // });
    console.log('------------------------------------------------');
    // console.dir(allUsers, { depth: null });
    console.log('------------------------------------------------');
    await this.ctx.render('index', { title: '哈哈哈哈' });
  }
}
