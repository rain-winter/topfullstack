import { PageDto } from '../common/page.dto';
import { ReturnModelType } from '@typegoose/typegoose';
import { Episode } from '@libs/db/models/episode.model';
import { Course } from '@libs/db/models/course.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import success from '../utils/common-res';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectModel(Episode)
    private readonly episodeModel: ReturnModelType<typeof Episode>,
  ) {}

  async create(createEpisodeDto: CreateEpisodeDto) {
    const res = await this.episodeModel.create(createEpisodeDto);
    return success(200, 'ok', res);
  }
  async findAllByCoueseId(page?: PageDto) {
    // Episode需要有courseId
    const res = await this.episodeModel
      .find()
      .populate('courseId', 'name cover');
    console.log(res);
  }

  async findAll(page?: PageDto) {
    if (page.currentPage && page.pageSize) {
      const { currentPage, pageSize } = page;
      let total;
      this.episodeModel.estimatedDocumentCount({}, (err, count) => {
        // console.log(count);
        total = count;
      });
      const users = await this.episodeModel
        .find()
        .populate('courseId', 'name cover')
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
      const user = await this.episodeModel
        .find()
        .populate('courseId', 'name cover'); // 查找所有用户
      return success(200, 'ok', user);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} episode`;
  }

  async update(_id: string, updateEpisodeDto: UpdateEpisodeDto) {
    const res = await this.episodeModel.findByIdAndUpdate(
      _id,
      updateEpisodeDto,
      {
        new: true,
      },
    );
    if (res) {
      return success(200, 'ok', res);
    }
  }

  async remove(id: string) {
    const res = await this.episodeModel.remove({ _id: id });
    return success(200, 'ok', res);
  }

  options() {
    return {
      index: true,
      title: '课程管理',
      border: true,
      align: 'center',
      menuAlign: 'center',
      column: [
        {
          label: '课程',
          prop: 'name',
        },
        {
          label: '课程封面',
          prop: 'file',
        },
      ],
    };
  }
}
