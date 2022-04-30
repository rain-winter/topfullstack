import { LoginDto } from './dto/login-dto';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '@libs/db/models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import success from '../utils/common-res';
import { PageDto } from '../common/page.dto';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async login(loginDto: LoginDto) {
    const res = await this.userModel.findOne(
      {
        username: loginDto.username,
      },
      '_id username',
    );
    if (res) {
      const password = await this.userModel.findOne({
        password: loginDto.password,
      });
      const SECRET = process.env.SECRET;
      const token = jwt.sign(
        {
          data: res._id,
        },
        SECRET,
        { expiresIn: '10s' },
      );
      const resData = { ...res._doc, token };
      if (password) {
        return success(200, 'ok', resData);
      } else {
        return success(10001, '密码错误');
      }
    } else {
      return success(10000, '用户不存在');
    }
  }

  async create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto); // 添加用户
    const res = await user.save();
    return success(200, 'ok', res);
  }

  /**
   * TODO page：当前页 PageSize：当前页限制的数量
   * TODO Model.find({}).skip((page -1)*PageSize).limit(PageSize)
   */
  async findAll(page?: PageDto) {
    if (page.currentPage && page.pageSize) {
      const { currentPage, pageSize } = page;
      let total;
      this.userModel.estimatedDocumentCount({}, (err, count) => {
        // console.log(count);
        total = count;
      });
      const users = await this.userModel
        .find()
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize)
        .sort({ _id: -1 });

      return {
        code: 200,
        msg: '获取成功',
        total,
        data: users,
      };
    } else {
      const user = await this.userModel.find(); // 查找所有用户
      return success(200, 'ok', user);
    }
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
