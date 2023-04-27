import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Message } from 'src/message/entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
@Injectable()
export class EventService {
  constructor(
    @Inject(Message.name)
    private readonly messageModel: ReturnModelType<typeof Message>,
  ) {}
  async sendMessage(createMessageDto: CreateMessageDto) {
    createMessageDto.user = '6449d6a03561c65cd6b85b44';
    return (await this.messageModel.create(createMessageDto)).populate('user');
  }
}
