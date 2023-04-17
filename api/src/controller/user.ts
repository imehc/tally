import { Controller, Inject, Get, Post, Body } from '@midwayjs/decorator';
import { Context } from 'egg';
import { UserService } from '../service';
import { USERID, defaultAvatar } from '../const';
import { type User } from '@prisma/client';

@Controller('/v1/user/')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  service: UserService;

  @Get('/info')
  async getUserInfo() {
    const userId = this.ctx.getAttr(USERID) as number;
    const userInfo = await this.service.findUserByUserId(userId);
    this.ctx.body = {
      data: {
        id: userInfo.id,
        username: userInfo.username,
        signature: userInfo.signature || '',
        avatar: userInfo.avatar || defaultAvatar,
      } as User,
    };
  }

  @Post('/info')
  async editUserInfo(
    @Body('signature') signature: User['signature'],
    @Body('avatar') avatar: User['avatar']
  ) {
    const userId = this.ctx.getAttr(USERID) as number;
    const userInfo = await this.service.findUserByUserId(userId);
    const result = await this.service.editUser({
      ...userInfo,
      signature,
      avatar,
    });
    this.ctx.body = {
      msg: '修改成功',
      data: {
        id: result.id,
        username: result.username,
        signature: result.signature || '',
        avatar: result.avatar || defaultAvatar,
      } as User,
    };
  }
}
