import { Inject, Provide } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';
import type { User } from '@prisma/client';
import { UserService } from '.';
import { encryptWithSalt } from '../util';
import { httpError } from '@midwayjs/core';

@Provide()
export class AuthService {
  @Inject()
  jwtService: JwtService;

  /**
   * 生成jwt
   */
  async certificate(entity: { id: number }) {
    const payload = {
      sub: entity.id,
    };

    try {
      // 签发生成 token
      const accessToken = await this.jwtService.sign(payload);
      // TODO: 封装工具统一返回
      return { accessToken };
    } catch (error) {
      console.error(error);
      throw new httpError.ServiceUnavailableError();
    }
  }

  @Inject()
  userService: UserService;

  /**
   * 注册
   */
  async register({ username, password, ...attr }: User) {
    const user = await this.userService.findByUsername(username);

    if (user) {
      throw new httpError.BadRequestError('用户已存在');
    }
    // TODO: 这里使用唯一的用户名加盐，后续可以使用生成
    const encryptedPassword = encryptWithSalt(password, username);

    try {
      const result = await this.userService.create({
        username,
        password: encryptedPassword,
        ...attr,
      });
      throw result.id;
    } catch (error) {
      throw new httpError.ServiceUnavailableError();
    }
  }

  /**
   * 登录
   */
  async login(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new httpError.BadRequestError('用户不存在');
    }
    if (encryptWithSalt(password, user.username) !== user.password) {
      throw new httpError.BadRequestError('账号或密码错误');
    }
    // 签发 token 并返回
    return this.certificate(user);
  }
}
