import mongoose, { Schema } from 'mongoose';
export interface Cinema {
    _id: string;
    totalSeats: number;
    bookedSeats: [Number];
}


const CinemaSchema: Schema<Cinema> = new Schema({
    totalSeats: Number,
    bookedSeats: [Number],
});

export const CinemaModel = mongoose.model<Cinema>('Cinema', CinemaSchema);
