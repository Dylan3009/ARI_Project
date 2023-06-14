import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as multer from 'multer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //app.use(multer({ dest: './src/files' }).single('file'));
  //app.use(multer({ dest: './src/files' }).single('file'));
  await app.listen(3001);
}
bootstrap();
