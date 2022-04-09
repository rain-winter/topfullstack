import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, Prop, Ref } from '@typegoose/typegoose';
import { Episode } from './episode.model';

// 设置 更新时间、创建时间
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Course {
  @ApiProperty({ description: `课程名称` })
  @Prop()
  name: string;

  @ApiProperty({ description: '课程封面' })
  @Prop()
  cover: string;

  @Prop({ type: String, required: true, default: [], itemsRef: 'Episode' })
  episodes: Ref<Episode>[];
}
