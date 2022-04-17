import { AdminController } from './admin.controller';
import { DbModule } from '@libs/db';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodeModule } from './episode/episode.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    DbModule,
    UsersModule,
    CoursesModule,
    EpisodeModule,
    MulterModule.register({
      // storage:
      dest: 'uploads', // dest是文件夹。存在本地根目录创建uploads文件夹
    }),
  ],
  controllers: [AdminController],
  providers: [],
})
export class AdminModule {}
