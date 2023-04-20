import { Rule, RuleType } from '@midwayjs/validate';
import { Bill } from '@prisma/client';

export enum PayType {
  EXPEND = 1,
  INCOME = 2,
}

export class BillDTO {
  @Rule(RuleType.number().required())
  amount: Bill['amount'];

  @Rule(RuleType.number().min(1).max(4).required())
  typeId: Bill['typeId'];

  @Rule(RuleType.string().min(1).max(6).required())
  typeName: Bill['typeName'];

  @Rule(RuleType.date().required())
  date: Bill['date'];

  @Rule(
    RuleType.number()
      .valid(...Object.values(PayType))
      .required()
  )
  payType: Bill['payType'];

  @Rule(RuleType.string().default(''))
  remark: Bill['remark'];
}

export class BillDetailDTO {
  @Rule(RuleType.date().required())
  date: Bill['date'];
}

export class BillListDTO extends BillDetailDTO {
  @Rule(RuleType.number().default(1))
  skip: number;

  @Rule(RuleType.number().default(5))
  take: number;

  @Rule(RuleType.number().default(0))
  typeId: Bill['typeId'];
}
