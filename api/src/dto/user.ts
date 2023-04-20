import { Rule, RuleType } from '@midwayjs/validate';
import { User } from '@prisma/client';

export class UserLoginDTO {
  @Rule(RuleType.string().min(2).max(10).required())
  username: User['username'];

  @Rule(RuleType.string().min(4).max(16).required())
  password: User['password'];
}

export class UserModifyPasswordDTO extends UserLoginDTO {
  @Rule(RuleType.string().min(2).max(10).required())
  oldPassword: User['password'];
}
