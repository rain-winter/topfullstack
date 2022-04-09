import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, Prop } from '@typegoose/typegoose';
// 设置 更新时间、创建时间
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @ApiProperty({
    description: `用户名`,
    example: '张三',
  })
  @Prop()
  username: string;

  @ApiProperty({
    description: `密码`,
    example: '123455',
  })
  @Prop()
  password: string;
}
