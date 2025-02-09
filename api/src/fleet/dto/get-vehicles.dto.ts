import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { VehicleStatus } from 'src/entities/vehicle-status-history.entity';

export class GetVehiclesDto {
  @ApiProperty({
    description: 'The status of the vehicle',
    enum: VehicleStatus,
    example: VehicleStatus.ACTIVE,
  })
  @IsEnum(VehicleStatus)
  @IsOptional()
  status?: VehicleStatus;
}
