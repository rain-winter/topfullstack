import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AdminModule } from './admin.module';
// import { AuthInterceptor } from './utils/AuthInterceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AdminModule);
  app.enableCors(); // 允许跨域
  app.useStaticAssets('uploads', {
    // 设置上传文件路径
    prefix: '/uploads',
  });
  // app.useGlobalInterceptors(new AuthInterceptor());
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('四月后台管理API')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag(
      '🚀春风变得软软的，阳光像刚切开的浆果冻芝士一样甜腻鲜艳，最好不过人间四月',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);
  // 从环境变量中取出port
  const PORT = process.env.ADMIN_PORT || 3000;
  await app.listen(PORT);
  Logger.debug(`http://localhost:${PORT}/api-doc`);
}
bootstrap();
