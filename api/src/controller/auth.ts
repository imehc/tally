import { Controller, Post, Body, Inject } from '@midwayjs/decorator';
import type { User } from '@prisma/client';
import { AuthService } from '../service';
import { UserLoginDTO, UserModifyPasswordDTO } from '../dto';
import { HttpStatus, httpError } from '@midwayjs/core';
import { Context } from 'egg';
import { Validate } from '@midwayjs/validate';

@Controller('/auth')
export class AuthController {
  @Inject()
  authService: AuthService;

  @Inject()
  ctx: Context;

  @Post('/register')
  // @Validate({ errorStatus: 422 })
  async register(@Body() body: User) {
    try {
      const userId = await this.authService.register(body);
      if (!userId) {
        throw new httpError.ServiceUnavailableError();
      }
      this.ctx.status = HttpStatus.CREATED;
    } catch (error) {
      throw new httpError.UnprocessableEntityError();
    }
  }

  @Post('/login')
  @Validate({ errorStatus: 422 })
  async login(@Body() { username, password }: UserLoginDTO) {
    return this.authService.login(username, password);
  }

  @Post('/modify-password')
  async modifyPassword(
    @Body() { username, oldPassword, password }: UserModifyPasswordDTO
  ) {
    // TODO: 修改密码
    return {
      msg: '暂未实现',
    };
  }
}
