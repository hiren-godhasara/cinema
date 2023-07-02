import { Injectable } from '@nestjs/common';
import { CinemaModel } from '../../models/cinema.model';
import { CinemaError } from './errorHandler/cinema.error';

@Injectable()
export class CinemaService {
    constructor() { }

    async createCinema(seats: number): Promise<string> {
        const cinema = new CinemaModel({ totalSeats: seats });
        await cinema.save();
        return cinema._id;
    }

    async purchaseSeat(id: string, seatNumber: number): Promise<string> {
        const session = await CinemaModel.startSession();
        session.startTransaction();

        try {
            const cinema = await CinemaModel.findById(id).session(session);
            if (!cinema) throw new CinemaError('Cinema not found');

            if (cinema.totalSeats < seatNumber) throw new CinemaError('Seat limit exceeded');

            if (cinema.bookedSeats.includes(seatNumber)) throw new CinemaError('Seat already purchased');

            cinema.bookedSeats.push(seatNumber);
            await cinema.save();

            await session.commitTransaction();
            session.endSession();

            return `Seat ${seatNumber} purchased successfully`;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            if (error instanceof CinemaError) throw new CinemaError(error.message);
            throw new CinemaError('Failed to purchase seat');
        }
    }

    async purchaseTwoConsecutiveSeats(id: string): Promise<number[]> {
        const session = await CinemaModel.startSession();
        session.startTransaction();
        try {
            const cinema = await CinemaModel.findById(id);
            if (!cinema) throw new CinemaError('Cinema not found');

            let consecutiveSeats = [];
            for (let i = 1; i <= cinema.totalSeats; i++) {
                if (!cinema.bookedSeats.includes(i) && !cinema.bookedSeats.includes(i + 1)) {
                    cinema.bookedSeats.push(i, i + 1);
                    consecutiveSeats = [i, i + 1]
                    break;
                }
            }
            if (consecutiveSeats.length === 0) throw new CinemaError('No two consecutive seats available');

            await cinema.save();
            await session.commitTransaction();
            session.endSession();
            return consecutiveSeats;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            if (error instanceof CinemaError) throw new CinemaError(error.message);
            throw new CinemaError('Failed to purchase two consecutive seats');
        }
    }
}
