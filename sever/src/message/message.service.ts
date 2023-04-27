import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Message } from './entities/message.entity';
@Injectable()
export class MessageService {
  constructor(
    @Inject(Message.name)
    private readonly messageModel: ReturnModelType<typeof Message>,
  ) {}
  async create() {}

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
