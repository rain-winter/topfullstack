/**
 * 课时
 */

import { Prop } from '@typegoose/typegoose';

export class Episode {
  @Prop()
  name: string;

  @Prop()
  file: string;
}
