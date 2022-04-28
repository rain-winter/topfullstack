import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ description: '课程名字' })
  name: string;

  @ApiProperty({ description: '封面' })
  cover: string;

  @ApiProperty({ description: '作者' })
  author: string;

  episodes: any;
}
