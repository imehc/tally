import { Controller, Post, Body, Inject } from '@midwayjs/decorator';
import type { User } from '@prisma/client';
import { AuthService } from '../service';

@Controller('/auth')
export class AuthController {
  @Inject()
  authService: AuthService;

  @Post('/register')
  async register(@Body() body: User) {
    return await this.authService.register(body);
  }

  @Post('/login')
  async login(
    @Body('username') username: User['username'],
    @Body('password') password: User['password']
  ) {
    return this.authService.login(username, password);
  }
}
