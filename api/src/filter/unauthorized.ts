import { Catch, httpError, HttpStatus, MidwayHttpError } from '@midwayjs/core';
import { Context } from 'egg';

@Catch(httpError.UnauthorizedError)
export class UnauthorizedErrorFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    ctx.status = HttpStatus.UNAUTHORIZED;
    ctx.body = err.message;
  }
}
