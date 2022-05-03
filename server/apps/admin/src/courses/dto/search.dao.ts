import { ApiProperty } from '@nestjs/swagger';

export class SearchDto {
  @ApiProperty({ description: '关键字' })
  key: string;
}
