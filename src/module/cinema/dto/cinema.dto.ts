import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt, Min, IsMongoId } from 'class-validator';

export class CinemaBodyDto {
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    seats: number;
}


export class purchaseSeatParamsDto {
    @IsNotEmpty()
    @IsMongoId()
    id: string;

    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    seatNumber: number;
}