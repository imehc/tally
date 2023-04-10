import { Catch, MidwayHttpError } from '@midwayjs/core';
import { Context } from 'egg';

@Catch()
export class DefaultErrorFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    ctx.status = +err.code;
    ctx.logger.error(err);
  }
}
