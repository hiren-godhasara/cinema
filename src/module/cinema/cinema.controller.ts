import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CinemaBodyDto, purchaseSeatParamsDto } from './dto/cinema.dto';
import { CinemaError } from './errorHandler/cinema.error';

@Controller('cinema')
export class CinemaController {
    constructor(private readonly cinemaService: CinemaService) { }

    @Post()
    async createCinema(@Body() body: CinemaBodyDto): Promise<string> {
        try {
            const cinemaId = await this.cinemaService.createCinema(body.seats);
            return cinemaId;
        } catch (error) {
            if (error instanceof CinemaError) throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            throw new HttpException('Failed to purchase seat', HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':id/purchase/:seatNumber')
    async purchaseSeat(@Param() params: purchaseSeatParamsDto): Promise<string> {
        try {
            const response = await this.cinemaService.purchaseSeat(params.id, params.seatNumber);
            return response;
        } catch (error) {
            if (error instanceof CinemaError) throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            throw new HttpException('Failed to purchase seat', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post(':id/purchase')
    async purchaseTwoConsecutiveSeats(@Param('id') id: string): Promise<number[]> {
        try {
            const response = await this.cinemaService.purchaseTwoConsecutiveSeats(id);
            return response;
        } catch (error) {
            if (error instanceof CinemaError) throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            throw new HttpException('Failed to purchase seat', HttpStatus.BAD_REQUEST);
        }
    }
}
