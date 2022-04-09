import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '@libs/db/models/user.model';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return await user.save();
  }

  async findAll() {
    const user = this.userModel.find();
    return user;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById({ _id: id });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const res = await this.userModel.remove({ _id: id });
    if (res.deletedCount == 1) {
      success();
    }
  }
}
