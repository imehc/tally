import {
  Body,
  Controller,
  Del,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@midwayjs/core';
import { Context } from 'egg';
import { BillDTO, BillDetailDTO, BillListDTO } from '../dto';
import { USERID } from '../const';
import { BillService } from '../service';
import moment = require('moment');
import { Bill } from '@prisma/client';
import { response } from '../util';

@Controller('/v1/bill/')
export class BillController {
  @Inject()
  ctx: Context;

  @Inject()
  service: BillService;

  @Post('/')
  async add(@Body() bill: BillDTO) {
    const userId = this.ctx.getAttr(USERID) as number;
    const result = await this.service.addBill(bill, userId);
    if (result.id) {
      this.ctx.status = HttpStatus.CREATED;
      return;
    }
    this.ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
  }

  @Get('/')
  async billList(@Query() { date, skip, take, typeId }: BillListDTO) {
    // TODO: 处理Date

    const userId = this.ctx.getAttr(USERID) as number;

    const list = await this.service.billList(
      userId,
      typeId !== 0 ? typeId : undefined,
      skip,
      take
    );

    // 格式化数据，将其变成我们之前设置好的对象格式
    const listMap = list.reduce((curr, item) => {
      // curr 默认初始值是一个空数组 []
      // 把第一个账单项的时间格式化为 YYYY-MM-DD
      const date = moment(Number(item.date)).format('YYYY-MM-DD');
      // 如果能在累加的数组中找到当前项日期 date，那么在数组中的加入当前项到 bills 数组。
      if (
        curr &&
        curr.length &&
        curr?.findIndex(item => item.date === date) > -1
      ) {
        const index = curr.findIndex(item => item.date === date);
        curr[index].bills.push(item);
      }
      // 如果在累加的数组中找不到当前项日期的，那么再新建一项。
      if (
        curr &&
        curr.length &&
        curr.findIndex(item => item.date === date) === -1
      ) {
        curr = [...curr, { date, bills: [item] }];
      }
      // 如果 curr 为空数组，则默认添加第一个账单项 item ，格式化为下列模式
      if (!curr.length) {
        curr = [...curr, { date, bills: [item] }];
      }
      return curr;
    }, []);

    // 分页处理，listMap 为我们格式化后的全部数据，还未分页。
    const filterListMap = listMap.slice((skip - 1) * take, skip * take);
    // 累加计算支出
    const totalExpense = list.reduce((curr, item) => {
      if (item.payType === 1) {
        curr += Number(item.amount);
        return curr;
      }
      return curr;
    }, 0);
    // 累加计算收入
    const totalIncome = list.reduce((curr, item) => {
      if (item.payType === 2) {
        curr += Number(item.amount);
        return curr;
      }
      return curr;
    }, 0);
    // 返回数据

    return response.send({
      code: 200,
      message: '请求成功',
      data: {
        totalExpense, // 当月支出
        totalIncome, // 当月收入
        totalPage: Math.ceil(listMap.length / take), // 总分页
        // totalPage: listMap.length, // 总分页
        list: filterListMap || [], // 格式化后，并且经过分页处理的数据
      },
    });
  }

  @Get('/:bid')
  async getBill(@Param('bid') bid: Bill['id']) {
    const userId = this.ctx.getAttr(USERID) as number;
    if (!bid || isNaN(Number(bid))) {
      this.ctx.status = HttpStatus.BAD_REQUEST;
      return response.send({
        code: 400,
        message: 'id不合法',
      });
    }
    const result = await this.service.getBill(userId, +bid);
    if (result) {
      return response.send({
        code: 200,
        message: '请求成功',
        data: result,
      });
    }
    this.ctx.status = HttpStatus.BAD_REQUEST;
    return response.send({
      code: 400,
      message: '请求失败,没有找到该账单',
      data: result,
    });
  }

  @Put('/:bid')
  async updateBill(@Param('bid') bid: Bill['id'], @Body() bill: BillDTO) {
    const userId = this.ctx.getAttr(USERID) as number;
    if (!bid || isNaN(Number(bid))) {
      this.ctx.status = HttpStatus.BAD_REQUEST;
      return response.send({
        code: 400,
        message: 'id不合法',
      });
    }
    const id = (await this.service.getBill(userId, +bid))?.id;
    if (!id) {
      this.ctx.status = HttpStatus.BAD_REQUEST;
      return response.send({
        code: 400,
        message: '更新账单失败',
      });
    }

    const result = await this.service.updateBill(+bid, bill);
    if (result) {
      return response.send({
        code: 200,
        message: '更新成功',
        data: result,
      });
    }
    this.ctx.status = HttpStatus.BAD_REQUEST;
    return response.send({
      code: 400,
      message: '更新账单失败',
    });
  }

  @Del('/:bid')
  async delBill(@Param('bid') bid: Bill['id']) {
    const userId = this.ctx.getAttr(USERID) as number;
    if (!bid || isNaN(Number(bid))) {
      this.ctx.status = HttpStatus.BAD_REQUEST;
      return response.send({
        code: 400,
        message: 'id不合法',
      });
    }
    const id = (await this.service.getBill(userId, +bid))?.id;
    if (!id) {
      this.ctx.status = HttpStatus.BAD_REQUEST;
      return response.send({
        code: 400,
        message: '删除账单失败',
      });
    }
    const result = await this.service.delBill(+bid);
    if (result) {
      this.ctx.status = HttpStatus.NO_CONTENT;
      return;
    }
  }

  @Get('/detail')
  async billDetail(@Query() { date }: BillDetailDTO) {
    const userId = this.ctx.getAttr(USERID) as number;

    const result = await this.service.billList(
      userId,
      undefined,
      undefined,
      undefined
    );
    if (!result) {
      this.ctx.status = HttpStatus.SERVICE_UNAVAILABLE;
      return;
    }
    const start = moment(date).startOf('month').unix() * 1000; // 选择月份，月初时间
    const end = moment(date).endOf('month').unix() * 1000; // 选择月份，月末时间
    const _data = result.filter(item => {
      if (Number(item.date) > start && Number(item.date) < end) {
        return item;
      }
    });
    // 总支出
    const total_expense = _data.reduce((arr, cur) => {
      if (cur.payType === 1) {
        arr += Number(cur.amount);
      }
      return arr;
    }, 0);

    // 总收入
    const total_income = _data.reduce((arr, cur) => {
      if (cur.payType === 2) {
        arr += Number(cur.amount);
      }
      return arr;
    }, 0);

    // 获取收支构成
    let total_data = _data.reduce((arr, cur) => {
      const index = arr.findIndex(item => item.typeId === cur.typeId);
      if (index === -1) {
        arr.push({
          type_id: cur.typeId,
          type_name: cur.typeName,
          pay_type: cur.payType,
          number: Number(cur.amount),
        });
      }
      if (index > -1) {
        arr[index].number += Number(cur.amount);
      }
      return arr;
    }, []);
    total_data = total_data.map(item => {
      item.number = Number(Number(item.number).toFixed(2));
      return item;
    });
    return response.send({
      code: 200,
      message: '请求成功',
      data: {
        total_expense: Number(total_expense).toFixed(2),
        total_income: Number(total_income).toFixed(2),
        total_data: total_data || [],
      },
    });
  }
}
