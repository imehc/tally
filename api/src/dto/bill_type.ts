import { Rule, RuleType } from '@midwayjs/validate';
import type { Type } from '@prisma/client';
import { PayType } from '.';

export class BillTypeDTO {
  @Rule(RuleType.string().min(2).max(6).required())
  name: Type['name'];

  @Rule(
    RuleType.number()
      .valid(...Object.values(PayType))
      .required()
  )
  type: Type['type'];
}
