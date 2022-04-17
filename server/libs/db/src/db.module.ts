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
    TypegooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.DB,
        // ...typegooseOptions (Note: config is spread with the uri)
      }),
    }),
    // TypegooseModule.forRootAsync({
    // useFactory() {
    //   return {
    //     uri: process.env.DB,
    //     useNewUrlParser: true,
    //   };
    // },
    // }),

    // 同步加载，会读取不到的，因为ConfigModule可能加载不完
    // TypegooseModule.forRoot('mongodb://localhost:27017/topfullstack', {
    //   useNewUrlParser: true,
    // } as TypegooseConnectionOptions),
    models,
    Response,
  ],
  providers: [DbService],
  exports: [DbService, models, Response],
})
export class DbModule {}
