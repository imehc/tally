import { Controller, Post, Body, Inject } from '@midwayjs/decorator';
import type { User } from '@prisma/client';
import { AuthService } from '../service';
import { UserLoginDTO, UserModifyPasswordDTO } from '../dto';

@Controller('/auth')
export class AuthController {
  @Inject()
  authService: AuthService;

  @Post('/register')
  async register(@Body() body: User) {
    return await this.authService.register(body);
  }

  @Post('/login')
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
