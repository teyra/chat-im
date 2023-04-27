import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { JoinGroupDto } from './dto/join-group.dto';
import { GroupService } from './group.service';

@WebSocketGateway({ cors: true })
export class GroupGateway {
  constructor(private readonly groupService: GroupService) {}
  @SubscribeMessage('joinGroup')
  joinGroup(@MessageBody() joinGroupDto: JoinGroupDto) {
    return this.groupService.joinGroup(joinGroupDto);
  }
}
