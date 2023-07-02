import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CinemaModule } from './module/cinema/cinema.module';

@Module({
  imports: [CinemaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
