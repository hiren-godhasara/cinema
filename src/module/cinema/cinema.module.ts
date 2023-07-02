import { Module } from '@nestjs/common';
import { CinemaController } from './cinema.controller';
import { CinemaService } from './cinema.service';

@Module({
  imports: [],
  controllers: [CinemaController],
  providers: [CinemaService],
  exports: [CinemaService],
})
export class CinemaModule {

}
