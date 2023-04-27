import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { GroupGateway } from './group.gateway';

@Module({
  controllers: [GroupController],
  providers: [GroupService, GroupGateway]
})
export class GroupModule {}
