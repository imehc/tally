import { Provide } from '@midwayjs/core';
import type { Type, User } from '@prisma/client';
import { prisma } from '../api';

@Provide()
export class BillTypeService {
  /**
   * 创建账单类型
   * @param bill
   */
  async addBillType(
    billType: Omit<Type, 'id' | 'userId'>,
    userId: User['id']
  ): Promise<Type> {
    return prisma.type.create({
      data: {
        name: billType.name,
        type: billType.type,
        userId: userId,
      },
    });
  }
}
