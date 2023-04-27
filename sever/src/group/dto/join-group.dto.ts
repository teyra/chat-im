import { ApiProperty } from '@nestjs/swagger';
export class JoinGroupDto {
  @ApiProperty({ description: '用户id' })
  userId: string;
  @ApiProperty({ description: '群id' })
  groupId: string;
}
