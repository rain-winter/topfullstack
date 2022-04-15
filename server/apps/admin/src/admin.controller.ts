import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('上传文件')
@Controller()
export class AdminController {
  @Get()
  a() {
    return 23;
  }
  /**
   *
   * @param file
   */
  @Post('upload') // 和service里的action一样
  @UseInterceptors(FileInterceptor('file'))
  // @UseInterceptors(AnyFilesInterceptor())
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `http://localhost:3000/uploads/${file.filename}`,
    };
  }
}
