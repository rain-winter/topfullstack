import { User } from './models/user.model';
import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { Response } from './utils/response';
import { TypegooseConnectionOptions, TypegooseModule } from 'nestjs-typegoose';

const models = TypegooseModule.forFeature([User]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/topfullstack', {
      useNewUrlParser: true,
    } as TypegooseConnectionOptions),
    models,
    Response,
  ],
  providers: [DbService],
  exports: [DbService, models, Response],
})
export class DbModule {}
// Argument of type '{ useNewUrlParser: boolean; }' is not assignable to parameter of type 'TypegooseConnectionOptions'.
//   Object literal may only specify known properties, and 'useNewUrlParser' does not exist in type 'TypegooseConnectionOptions'
