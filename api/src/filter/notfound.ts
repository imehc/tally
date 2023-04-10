import { Catch, httpError, HttpStatus, MidwayHttpError } from '@midwayjs/core';
import { Context } from 'egg';

@Catch(httpError.NotFoundError)
export class NotFoundErrorFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    ctx.status = HttpStatus.NOT_FOUND;
    ctx.body = err.message;
  }
}
