import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('全栈之巅前台管理API')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('🚀')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);
  // 从环境变量中取出port
  const PORT = process.env.ADMIN_PORT || 3001;
  await app.listen(PORT);
  Logger.debug(`http://localhost:${PORT}/api-doc`);
}
bootstrap();
// nest g lib common
