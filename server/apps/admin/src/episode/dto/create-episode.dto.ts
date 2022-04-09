import { ApiProperty } from '@nestjs/swagger';

export class CreateEpisodeDto {
  @ApiProperty({ description: '课时名字' })
  name: string;

  @ApiProperty({ description: '文件' })
  file: string;
}
