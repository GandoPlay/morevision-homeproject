import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { ConfigModule } from '@nestjs/config';
import { FleetService } from './fleet/fleet.service';
import { FleetModule } from './fleet/fleet.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, VehicleModule, FleetModule],
})
export class AppModule {}
