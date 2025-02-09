import { Module } from '@nestjs/common';
import { FleetController } from './fleet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from 'src/entities/vehicle.entity';
import { VehicleStatusHistory } from 'src/entities/vehicle-status-history.entity';
import { FleetService } from './fleet.service';
import { Fleet } from 'src/entities/fleet.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60,
      max: 100,
    }),
    TypeOrmModule.forFeature([Vehicle, Fleet]),
  ],
  exports: [TypeOrmModule, CacheModule],
  controllers: [FleetController],
  providers: [FleetService],
})
export class FleetModule {}
