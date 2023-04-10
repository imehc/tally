import { Catch, httpError, HttpStatus, MidwayHttpError } from '@midwayjs/core';
import { Context } from 'egg';

@Catch(httpError.BadRequestError)
export class BadRequestErrorFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    ctx.status = HttpStatus.BAD_REQUEST;
    ctx.body = err.message;
  }
}
