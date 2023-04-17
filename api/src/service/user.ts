import { Provide } from '@midwayjs/core';
import type { User } from '@prisma/client';
import { prisma } from '../api';

@Provide()
export class UserService {
  /**
   * 根据id查询用户信息
   * @param username 用户唯一名称
   */
  async findUserByUsername(username: string): Promise<User> {
    return prisma.user.findFirst({ where: { username } });
  }
  /**
   * 根据id查询用户信息
   * @param userId 用户唯一id
   */
  async findUserByUserId(userId: User['id']): Promise<User> {
    return prisma.user.findFirst({ where: { id: userId } });
  }

  async editUser(user: User): Promise<User> {
    return prisma.user.update({ where: { id: user.id }, data: user });
  }

  async create(user: User): Promise<User> {
    return prisma.user.create({
      data: {
        username: user.username,
        password: user.password,
        signature: user.signature,
        avatar: user.avatar,
      },
    });
  }
}
