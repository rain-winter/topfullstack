import { DbModule } from '@libs/db';
import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [DbModule, UsersModule, CoursesModule],
  controllers: [],
  providers: [AdminService],
})
export class AdminModule {}