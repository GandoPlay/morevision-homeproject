import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { Vehicle } from 'src/entities/vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleStatusHistory } from 'src/entities/vehicle-status-history.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60,
      max: 100,
    }),
    TypeOrmModule.forFeature([Vehicle, VehicleStatusHistory]),
  ],
  exports: [TypeOrmModule, CacheModule],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
