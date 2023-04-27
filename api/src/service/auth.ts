import { Inject, Provide } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';
import type { User } from '@prisma/client';
import { UserService } from '.';
import { type IHttpResponse, encryptWithSalt, response } from '../util';
import { httpError } from '@midwayjs/core';

@Provide()
export class AuthService {
  @Inject()
  jwtService: JwtService;

  /**
   * 生成jwt
   */
  async certificate(entity: { id: number }): Promise<Partial<IHttpResponse>> {
    const payload = {
      sub: entity.id,
    };

    try {
      // 签发生成 token
      const accessToken = await this.jwtService.sign(payload);
      // TODO: 封装工具统一返回
      return response.send({
        code: 200,
        message: '登录成功',
        data: {
          accessToken,
        },
      });
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
    const user = await this.userService.findUserByUsername(username);

    if (user) {
      throw new httpError.UnprocessableEntityError('用户已存在');
    }
    // TODO: 这里使用唯一的用户名加盐，后续可以使用生成
    const encryptedPassword = encryptWithSalt(password, username);

    return await this.userService.create({
      username,
      password: encryptedPassword,
      ...attr,
    });
    // TODO: 可以注册后签发token，避免再次输入用户名和密码，提升用户体验
  }

  /**
   * 登录
   */
  async login(username: string, password: string) {
    const user = await this.userService.findUserByUsername(username);
    if (!user) {
      throw new httpError.UnprocessableEntityError('用户不存在');
    }
    if (encryptWithSalt(password, user.username) !== user.password) {
      throw new httpError.BadRequestError('账号或密码错误');
    }
    // 签发 token 并返回
    return this.certificate(user);
  }
}
