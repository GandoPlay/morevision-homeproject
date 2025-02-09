import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVehicleDto {
  @ApiProperty({
    description: 'The license plate of the vehicle',
    example: 'XYZ-9876',
  })
  @IsOptional()
  @IsString()
  licensePlate?: string;

  @ApiProperty({
    description: 'The manufacturer of the vehicle',
    example: 'Honda',
  })
  @IsOptional()
  @IsString()
  manufacturer?: string;

  @ApiProperty({
    description: 'The model of the vehicle',
    example: 'Civic',
  })
  @IsOptional()
  @IsString()
  model?: string;
}
