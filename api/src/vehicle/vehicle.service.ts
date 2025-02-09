import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from 'src/entities/vehicle.entity';
import {
  VehicleStatus,
  VehicleStatusHistory,
} from 'src/entities/vehicle-status-history.entity';
import { DataSource } from 'typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import PostgreSQLErrorEnum from 'src/common/enums/error.enums';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Vehicle) private vehiclesRepository: Repository<Vehicle>,
    @InjectRepository(VehicleStatusHistory)
    private vehicleStatusHistoryRepository: Repository<VehicleStatusHistory>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getStatusHistory(id: string) {
    try {
      const vehicle = await this.vehiclesRepository.findOne({
        where: { id },
        relations: ['statusHistory'],
      });

      return vehicle.statusHistory;
    } catch (error) {
      throw new HttpException(
        'Error while fetching status history',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateVehicle(id: string, updateVehicleDto: UpdateVehicleDto) {
    try {
      return await this.dataSource.transaction(async (manager) => {
        let result = await this.cacheManager.get<Vehicle>(`vehicle_${id}`);
        if (!result) {
          try {
            result = await manager.findOne(this.vehiclesRepository.target, {
              where: { id },
              relations: ['fleet'],
            });
          } catch (error) {
            if (error.code === PostgreSQLErrorEnum.INVALID_INPUT_FOR_UUID) {
              throw new HttpException(
                'Vehicle not found',
                HttpStatus.NOT_FOUND,
              );
            }
            throw error;
          }
        }
        if (!result) {
          throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
        }
        await manager.update(
          this.vehiclesRepository.target,
          id,
          updateVehicleDto,
        );

        // Invalidate the cache for the updated vehicle
        await this.cacheManager.del(`vehicle_${id}`);
        await this.cacheManager.del(`fleet_${result.fleet.id}`);
        return result;
      });
    } catch (error) {
      if (error.code === PostgreSQLErrorEnum.DUPLICATE_ERROR) {
        throw new HttpException(
          'CONFLICT with licence Plate',
          HttpStatus.CONFLICT,
        );
      }
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error while updating vehicle',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteVehicle(id: string) {
    try {
      const result = await this.vehiclesRepository.delete(id);

      if (result.affected === 0) {
        throw new HttpException('Vehicle Not Found', HttpStatus.NOT_FOUND);
      }
      // Invalidate the cache for the deleted vehicle
      await this.cacheManager.del(`vehicle_${id}`);
      await this.cacheManager.del(`fleet_${id}`);

      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error while deleting vehicle',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateStatus(id: string, newStatus: VehicleStatus) {
    try {
      return await this.dataSource.transaction(async (manager) => {
        // Attempt to retrieve the vehicle from cache
        let vehicle = await this.cacheManager.get<Vehicle>(`vehicle_${id}`);

        if (!vehicle) {
          // Fetch from the database if not in cache
          vehicle = await manager.findOne(this.vehiclesRepository.target, {
            where: { id },
            relations: ['fleet', 'statusHistory'],
          });

          if (!vehicle) {
            throw new HttpException('Vehicle Not Found', HttpStatus.NOT_FOUND);
          }
        }
        if (vehicle.status === newStatus) {
          throw new HttpException(
            'Status is already set to the requested value',
            HttpStatus.BAD_REQUEST,
          );
        }

        const prevStatus = vehicle.status;
        vehicle.status = newStatus;
        const history = new VehicleStatusHistory();
        history.newStatus = newStatus;
        history.previousStatus = prevStatus;

        await manager.save(history);
        vehicle.statusHistory.push(history);
        await manager.save(vehicle);

        // await manager.save(this.vehicleStatusHistoryRepository.target, {
        //   vehicleId: id,
        //   prevStatus,
        //   newStatus,
        // });

        // Update cache with the vehicle data
        await this.cacheManager.set(`vehicle_${id}`, vehicle);
        await this.cacheManager.del(`fleet_${vehicle.fleet.id}`);

        return vehicle;
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error while updating status',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
