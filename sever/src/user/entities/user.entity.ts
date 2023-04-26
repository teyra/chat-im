
import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';
export class User {
  @Prop()
  @ApiProperty({ description: '账号' })
  username: string;
  @Prop()
  @ApiProperty({ description: '手机号码' })
  mobile: string;
  @Prop({
    select: false,
    get(val) {
      return val;
    },
    set(val) {
      return val && hashSync(val, 10);
    },
  })
  @ApiProperty({ description: '密码' })
  password: string;
}
