import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateVehicleDto } from 'src/vehicle/dto/create-vehicle.dto';

export class CreateFleetDto {
  @ApiProperty({
    description: 'The name of the fleet',
    example: 'ABC-1234',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The vehicles in the fleet',
    type: [CreateVehicleDto],
    example: [
      {
        licensePlate: 'XYZ-5678',
        model: 'Toyota Camry',
        manufacturer: 'Toyota',
      },
      {
        licensePlate: 'ABC-1234',
        model: 'Honda Accord',
        manufacturer: 'Honda',
      },
    ],
  })
  vehicles: CreateVehicleDto[];
}
