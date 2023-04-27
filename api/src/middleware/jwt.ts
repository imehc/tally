import {
  httpError,
  IMiddleware,
  Inject,
  Middleware,
  NextFunction,
} from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';
import { Context } from 'egg';
import { USERID } from '../const';

@Middleware()
export class JwtMiddleware implements IMiddleware<Context, NextFunction> {
  @Inject()
  jwtService: JwtService;

  public static getName(): string {
    return 'jwt';
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 认证身份信息判断和获取
      if (!ctx.headers['authorization']) {
        throw new httpError.UnauthorizedError();
      }

      const parts = ctx.get('authorization').trim().split(' ');

      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError();
      }

      const [scheme, token] = parts;

      if (/^Bearer$/i.test(scheme)) {
        // jwt.verify 方法验证 token 是否合法
        try {
          await this.jwtService.verify(token, {
            complete: true,
          });
        } catch (error) {
          throw new httpError.UnauthorizedError('token is not valid');
        }
        const userId = this.jwtService.decode(token, {
          complete: true,
        }).payload.sub;
        if (!userId || typeof userId === 'function' || isNaN(+userId)) {
          throw new httpError.ServiceUnavailableError();
        }
        ctx.setAttr(USERID, +userId);

        await next();
      }
    };
  }

  // /**
  //  * 配置忽略认证校验的路由地址
  //  */
  // public ignore(ctx: Context): boolean {
  //   const ignore = ['/api/auth/register', '/api/auth/login', /^\/api/].includes(
  //     ctx.path
  //   );
  //   return ignore;
  // }
  /**
   * 配置匹配认证校验的路由地址
   */
  public match(ctx: Context): boolean {
    const match = /^\/apis\/v1/.test(ctx.path);
    return match;
  }
}
