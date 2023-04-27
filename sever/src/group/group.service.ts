import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateGroupDto } from './dto/create-group.dto';
import { JoinGroupDto } from './dto/join-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
export enum USER_GROUP_STATUS {
  JOIN_SUCCESS = 1,
  IN_GROUP = 2,
  OUT_GROUP = 3,
}
@Injectable()
export class GroupService {
  constructor(
    @Inject(Group.name)
    private readonly groupModel: ReturnModelType<typeof Group>,
  ) {}
  async create(createGroupDto: CreateGroupDto) {
    return await this.groupModel.create(createGroupDto);
  }

  findAll() {
    return `This action returns all group`;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
  async joinGroup(joinGroupDto: JoinGroupDto) {
    const { groupId, userId } = joinGroupDto;
    const group = await this.groupModel.findById(groupId);
    const exist = group.members.find((v) => String(v) === userId);
    if (exist) {
      return {
        status: USER_GROUP_STATUS.IN_GROUP,
        msg: '在群中',
      };
    } else {
      await this.groupModel.findByIdAndUpdate(
        groupId,
        {
          $push: {
            members: userId,
          },
        },
        {
          new: true,
        },
      );
      return {
        status: USER_GROUP_STATUS.JOIN_SUCCESS,
        msg: '加群成功',
      };
    }
  }
}
