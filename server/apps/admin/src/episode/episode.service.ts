import { ReturnModelType } from '@typegoose/typegoose';
import { Episode } from '@libs/db/models/episode.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectModel(Episode)
    private readonly episodeModel: ReturnModelType<typeof Episode>,
  ) {}

  async create(createEpisodeDto: CreateEpisodeDto) {
    return await this.episodeModel.create(createEpisodeDto);
  }

  findAll() {
    return `This action returns all episode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} episode`;
  }

  update(id: number, updateEpisodeDto: UpdateEpisodeDto) {
    return `This action updates a #${id} episode`;
  }

  remove(id: number) {
    return `This action removes a #${id} episode`;
  }
}
