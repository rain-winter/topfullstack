import { TokenMiddleware } from './utils/token.middleware';
import { AdminController } from './admin.controller';
import { DbModule } from '@libs/db';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodeModule } from './episode/episode.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from '@app/common';

@Module({
  imports: [
    DbModule,
    UsersModule,
    CoursesModule,
    EpisodeModule,
    CommonModule, // TODO 必须导入CommonModule，才可以调用环境变量
    MulterModule.register({
      // storage:
      dest: 'uploads', // dest是文件夹。存在本地根目录创建uploads文件夹
    }),
  ],
  controllers: [AdminController],
  providers: [
    // { // 拦截器
    //   provide: APP_INTERCEPTOR,
    //   useClass: AuthInterceptor,
    // },
  ],
})
export class AdminModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .exclude({ path: 'users/login', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
