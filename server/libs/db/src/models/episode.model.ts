/**
 * 课时（一小节一小节的视频）
 */

import { modelOptions, Prop } from '@typegoose/typegoose';
// 设置 更新时间、创建时间
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Episode {
  @Prop()
  name: string;

  @Prop()
  file: string;
}
