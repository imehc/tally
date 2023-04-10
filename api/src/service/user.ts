import { Provide } from '@midwayjs/core';
import type { User } from '@prisma/client';
import { prisma } from '../api';

@Provide()
export class UserService {
  async findByUsername(username: string): Promise<User> {
    return prisma.user.findFirst({ where: { username } });
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
