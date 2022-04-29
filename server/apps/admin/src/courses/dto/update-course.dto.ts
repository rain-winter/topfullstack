import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @ApiProperty({ description: '课程名字' })
  name?: string;

  @ApiProperty({ description: '封面' })
  cover?: string;

  @ApiProperty({ description: '作者' })
  author?: string;

  @ApiProperty({ description: '分区' })
  partition: string;
}
