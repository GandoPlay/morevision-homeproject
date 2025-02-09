import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
    @ApiProperty({
        description: 'The license plate of the vehicle',
        example: 'ABC-1234'
    })
    @IsNotEmpty()
    @IsString()
    licensePlate: string;

    @ApiProperty({
        description: 'The manufacturer of the vehicle',
        example: 'Toyota'
    })
    @IsNotEmpty()
    @IsString()
    manufacturer: string;

    @ApiProperty({
        description: 'The model of the vehicle',
        example: 'Corolla'
    })
    @IsNotEmpty()
    @IsString()
    model: string;
}