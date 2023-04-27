import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { EventService } from './event.service';
import { Server } from 'socket.io';
import { CreateMessageDto } from './dto/create-message.dto';
export enum CHAT_EVENT {
  MESSAGE_RECEIVED = 'message_received',
  MESSAGE_SEND_SUCCESS = 'message_send_success',
}
@WebSocketGateway({ cors: true })
export class EventGateway {
  constructor(private readonly eventService: EventService) {}
  @WebSocketServer()
  eventServer: Server;
  @SubscribeMessage('sendMessage')
  async sendMessage(@MessageBody() CreateMessageDto: CreateMessageDto) {
    const msg = await this.eventService.sendMessage(CreateMessageDto);
    this.eventServer.emit(CHAT_EVENT.MESSAGE_RECEIVED, msg);
    return CHAT_EVENT.MESSAGE_SEND_SUCCESS;
  }
}
