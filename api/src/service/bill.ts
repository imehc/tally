import { Provide } from '@midwayjs/core';
import type { Bill, User } from '@prisma/client';
import { prisma } from '../api';

@Provide()
export class BillService {
  /**
   * 创建账单
   * @param bill
   */
  async addBill(
    bill: Omit<Bill, 'id' | 'userId'>,
    userId: User['id']
  ): Promise<Bill> {
    return prisma.bill.create({
      data: {
        amount: bill.amount,
        typeName: bill.typeName,
        date: bill.date,
        payType: bill.payType,
        remark: bill.remark,
        type: {
          connect: { id: bill.typeId },
          // 暂时只允许使用默认标签
          // connectOrCreate: {
          //   where: { id: bill.typeId },
          //   create: { id: bill.typeId, name: bill.typeName, userId: 0 },
          // },
        },
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  /**
   * 获取账单列表
   */
  async billList(
    userId: User['id'] | undefined,
    typeId: Bill['typeId'] | undefined,
    skip: number | undefined,
    take: number | undefined
  ) {
    const _skip = skip * take; // 分页
    _skip; // 为了计算当月的数据暂时按照小册的写法

    return prisma.bill.findMany({
      where: { userId: userId, typeId: typeId },
      select: {
        id: true,
        payType: true,
        amount: true,
        date: true,
        typeName: true,
        remark: true,
        typeId: true,
        userId: false,
      },
      orderBy: {
        date: 'desc', // 降序
      },
      // skip: _skip,
      // take: take,
    });
  }

  /**
   * 获取账单详情
   */
  async getBill(userId: User['id'], bid: Bill['id']) {
    return prisma.bill.findFirst({
      select: {
        id: true,
        payType: true,
        amount: true,
        date: true,
        typeName: true,
        remark: true,
        typeId: false,
        userId: false,
      },
      where: {
        id: bid,
        userId: userId,
      },
    });
  }

  /**
   * 更新账单详情
   */
  async updateBill(bid: Bill['id'], bill: Partial<Bill>) {
    return prisma.bill.update({
      data: {
        amount: bill.amount,
        typeId: bill.typeId,
        typeName: bill.typeName,
        date: bill.date,
        payType: bill.payType,
        remark: bill.remark,
      },
      where: {
        id: bid,
      },
      select: {
        id: true,
        payType: true,
        amount: true,
        date: true,
        typeName: true,
        remark: true,
        typeId: false,
        userId: false,
      },
    });
  }

  /**
   * 删除账单
   */
  async delBill(bid: Bill['id']) {
    return prisma.bill.delete({ where: { id: bid } });
  }
}
