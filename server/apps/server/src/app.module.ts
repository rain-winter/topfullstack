import { CommonModule } from './../../../libs/common/src/common.module';
import { DbModule } from '@libs/db';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DbModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
