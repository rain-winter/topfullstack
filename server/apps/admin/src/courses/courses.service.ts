import { SearchDto } from './dto/search.dao';
import { PageDto } from '../common/page.dto';
import { Course } from '@libs/db/models/course.model';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import success from '../utils/common-res';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course)
    private readonly courseModel: ReturnModelType<typeof Course>,
  ) {}

  async serach(searchDto: SearchDto) {
    const { key } = searchDto;
    const reg = new RegExp(key, 'i');
    console.log(reg);
    const res = await this.courseModel.find({
      $or: [{ name: { $regex: reg } }, { partition: { $regex: reg } }],
    });
    return success(200, 'ok', res);
  }

  async create(createCourseDto: CreateCourseDto) {
    console.log(createCourseDto);
    const res = await this.courseModel.create(createCourseDto);
    return success(200, 'OK', res);
  }

  async findAll(page?: PageDto) {
    const total = await this.courseModel.estimatedDocumentCount();

    if (page.currentPage && page.pageSize) {
      const { currentPage, pageSize } = page;
      // if (total % pageSize) {
      //   total = Math.ceil(total);
      // }
      console.log(total);
      const users = await this.courseModel
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
      const users = await this.courseModel.find(); // 查找所有用户
      return {
        code: 200,
        msg: '获取成功',
        total: total,
        data: users,
      };
    }
  }

  findOne(id: string) {
    return `findOne+${id}`;
  }

  async update(_id: string, updateCourseDto: UpdateCourseDto) {
    const res = await this.courseModel.findByIdAndUpdate(_id, updateCourseDto, {
      new: true,
    });
    return success(200, '更新成功', res);
  }

  async remove(id: string) {
    const res = await this.courseModel.remove({ _id: id });
    if (res.deletedCount == 1) {
      return success(200, '删除成功');
    }
  }
}
