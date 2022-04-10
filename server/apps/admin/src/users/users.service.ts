import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '@libs/db/models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import success from '../utils/common-res';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto); // 添加用户
    const res = await user.save();
    return success(200, 'ok', res);
  }

  async findAll() {
    const user = this.userModel.find(); // 查找所有用户
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById({ _id: id }); // 查找一个用户
    return user;
  }

  async update(_id: string, updateUserDto: UpdateUserDto) {
    const res = await this.userModel.findByIdAndUpdate(_id, updateUserDto, {
      new: true,
    });
    if (res) {
      return success(200, 'ok', res);
    }
  }

  async remove(id: string) {
    const res = await this.userModel.remove({ _id: id });
    console.log(res);
    if (res.deletedCount === 1) {
      return {
        code: 200,
        data: res.deletedCount,
        message: '删除成功',
      };
    } else {
      return {
        code: 400,
        data: res.deletedCount,
        message: '删除失败',
      };
    }
  }
}
