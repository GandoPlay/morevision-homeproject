import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VehicleStatus } from 'src/entities/vehicle-status-history.entity';

export class UpdateStatusDto {
  @ApiProperty({
    description: 'The status of the vehicle',
    enum: VehicleStatus,
    example: VehicleStatus.ACTIVE,
  })
  @IsNotEmpty()
  @IsEnum(VehicleStatus)
  status: VehicleStatus;
}
