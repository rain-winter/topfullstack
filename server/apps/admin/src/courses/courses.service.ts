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

  async create(createCourseDto: CreateCourseDto) {
    const res = await this.courseModel.create(createCourseDto);
    return success(200, 'OK', res);
  }

  async findAll() {
    const courses = await this.courseModel.find();
    return success(200, 'OK', courses);
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  async update(_id: string, updateCourseDto: UpdateCourseDto) {
    const res = await this.courseModel.findByIdAndUpdate(_id, updateCourseDto, {
      new: true,
    });
    return success(200, '更新成功', res);
  }

  async remove(id: string) {
    return await this.courseModel.remove({ _id: id });
  }
}
// return await this.userModel.findByIdAndUpdate(_id, updateUserDto, {
//   new: true,
// });
