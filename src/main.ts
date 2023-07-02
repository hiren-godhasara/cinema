import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dbConnection } from './models';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await dbConnection();
  await app.listen(process.env.PORT || 8001, () => {
    console.log('listening on port ' + process.env.PORT);
  });
}
bootstrap();
