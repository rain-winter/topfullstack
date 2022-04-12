import { ApiProperty } from '@nestjs/swagger';

export class PageDto {
  @ApiProperty({
    description: `当前页`,
    required: false,
  })
  currentPage?: number;
  @ApiProperty({
    description: '当前页限制的数量',
    required: false,
  })
  pageSize?: number;
}
