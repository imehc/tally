import { Catch, HttpStatus, MidwayHttpError } from '@midwayjs/core';
import { Context } from 'egg';

@Catch()
export class DefaultErrorFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    ctx.status = isNaN(+err.code) ? HttpStatus.SERVICE_UNAVAILABLE : +err.code;
    ctx.body = err.message;
    // ctx.logger.error(err);
  }
}
