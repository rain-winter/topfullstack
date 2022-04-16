import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('上传文件')
@Controller()
export class AdminController {
  @Post('upload') // 和service里的action一样
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return {
      url: `http://localhost:3000/uploads/${file.filename}`,
    };
  }
}
