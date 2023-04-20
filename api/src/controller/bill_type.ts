import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  httpError,
} from '@midwayjs/core';
import { Context } from 'egg';
import { USERID } from '../const';
import { BillTypeService } from '../service';
import { BillTypeDTO } from '../dto';

@Controller('/v1/bill-type/')
export class BillController {
  @Inject()
  ctx: Context;

  @Inject()
  service: BillTypeService;

  @Post('/')
  async add(@Body() { name, type }: BillTypeDTO) {
    const userId = this.ctx.getAttr(USERID) as number;
    const result = await this.service.addBillType({ name, type }, userId);
    if (result.id) {
      this.ctx.status = HttpStatus.CREATED;
      return;
    }
    throw new httpError.BadRequestError('创建失败');
  }
}
