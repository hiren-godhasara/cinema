import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dbConnection } from './models';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await dbConnection();
  await app.listen(process.env.PORT || 8001, () => {
    console.log('listening on port ' + process.env.PORT);
  });
}
bootstrap();
