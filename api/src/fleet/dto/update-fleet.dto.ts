import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateVehicleDto {
  @IsString()
  licensePlate: string;

  @IsString()
  manufacturer: string;

  @IsString()
  model: string;
}
