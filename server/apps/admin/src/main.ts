import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AdminModule } from './admin.module';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);

  const config = new DocumentBuilder()
    .setTitle('全栈之巅')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('🚀')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);
  await app.listen(3000);
  console.log('localhost:3000');
}
bootstrap();