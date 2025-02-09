import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { CreateVehicleDto } from 'src/vehicle/dto/create-vehicle.dto';

export class AddVehiclesDto {
  @ApiProperty({
    description: 'The vehicles',
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
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateVehicleDto)
  vehicles: CreateVehicleDto[];
}
