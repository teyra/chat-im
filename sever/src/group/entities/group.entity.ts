import { ApiProperty } from '@nestjs/swagger';
import { ModelOptions, Prop, Ref } from '@typegoose/typegoose';
import { User } from 'src/user/entities/user.entity';
export enum CHAT_TYPE {
  SINGLE = 1, //单聊
  GROUP = 2, //群聊
}
export class Group {
  @Prop({ default: '' })
  @ApiProperty({ description: '群昵称' })
  name: string;
  @Prop({ default: 1, enum: CHAT_TYPE })
  @ApiProperty({ description: '群类型' })
  type: CHAT_TYPE;
  @Prop({ ref: 'User' })
  @ApiProperty({ description: '群成员' })
  members: Ref<User>[];
}
