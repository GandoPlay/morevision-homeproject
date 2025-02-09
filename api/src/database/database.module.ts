import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fleet } from 'src/entities/fleet.entity';
import { VehicleStatusHistory } from 'src/entities/vehicle-status-history.entity';
import { Vehicle } from 'src/entities/vehicle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle, VehicleStatusHistory, Fleet]),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'tour-viz-db',
        port: 5432,
        username: 'postgres',
        password: '123',
        database: 'nest',
        autoLoadEntities: true,
        synchronize: true, // Auto-create tables (disable in production)
      }),
    }),
  ],
})
export class DatabaseModule {}
