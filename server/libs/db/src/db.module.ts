import { User } from './models/user.model';
import { Course } from './models/course.model';
import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { Response } from './utils/response';
import { TypegooseConnectionOptions, TypegooseModule } from 'nestjs-typegoose';
import { Episode } from './models/episode.model';

const models = TypegooseModule.forFeature([User, Course, Episode]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/topfullstack', {
      useNewUrlParser: true,
    } as TypegooseConnectionOptions),
    models,
    Response,
  ],
  providers: [DbService],
  exports: [DbService, models, Response],
})
export class DbModule {}
