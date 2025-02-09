import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from 'src/entities/vehicle.entity';

import { DataSource } from 'typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { CreateFleetDto } from './dto/create-fleet.dto';
import { Fleet } from 'src/entities/fleet.entity';
import { CreateVehicleDto } from 'src/vehicle/dto/create-vehicle.dto';
import PostgreSQLErrorEnum from 'src/common/enums/error.enums';
import { VehicleStatus } from 'src/entities/vehicle-status-history.entity';

@Injectable()
export class FleetService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Vehicle) private vehiclesRepository: Repository<Vehicle>,
    @InjectRepository(Fleet)
    private fleetRepository: Repository<Fleet>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getFleets() {
    const fleets = await this.fleetRepository.find();
    return fleets.map((fleet) => {
      return { name: fleet.name, id: fleet.id };
    });
  }

  async getFleetsWithVehiclesByLicensePlatePrefix(prefix: string) {
    const fleets = await this.fleetRepository
      .createQueryBuilder('fleet')
      .leftJoinAndSelect('fleet.vehicles', 'vehicle')
      .where('vehicle.licensePlate LIKE :prefix', { prefix: `${prefix}%` })
      .getMany();

    return fleets;
  }

  queryBuilder(id, status?: VehicleStatus) {
    const query = this.vehiclesRepository
      .createQueryBuilder('vehicle')
      .leftJoinAndSelect('vehicle.fleet', 'fleet')
      .where('fleet.id = :fleetId', { fleetId: id });

    // Add the optional status filter only if it's provided
    if (status != null) {
      query.andWhere('vehicle.status = :status', {
        status:
          status === VehicleStatus.ACTIVE
            ? VehicleStatus.ACTIVE
            : VehicleStatus.INACTIVE,
      });
    }
    return query;
  }

  async getAllVehiclesInFleet(
    id: string,
    status?: VehicleStatus,
  ): Promise<Vehicle[]> {
    try {
      const res = await this.queryBuilder(id, status).getMany();
      return res;
    } catch (error) {
      if (error.code === PostgreSQLErrorEnum.INVALID_INPUT_FOR_UUID) {
        // PostgreSQL invalid input syntax for type uuid
        throw new HttpException('Fleet not found', HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }
  async addVehicles(id: string, dtos: CreateVehicleDto[]): Promise<Fleet> {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const vehicles: Vehicle[] = [];

        for (const dto of dtos) {
          const vehicle = await manager.save(
            this.vehiclesRepository.target,
            dto,
          );
          vehicles.push(vehicle);
        }

        // Check cache for fleet
        let fleet: Fleet = await this.cacheManager.get(`fleet_${id}`);

        if (!fleet) {
          // If not in cache, fetch from database
          try {
            fleet = await manager.findOne(Fleet, {
              where: { id },
              relations: ['vehicles'],
            });
          } catch (error) {
            if (error.code === PostgreSQLErrorEnum.INVALID_INPUT_FOR_UUID) {
              throw new HttpException('Fleet not found', HttpStatus.NOT_FOUND);
            }
            throw error;
          }

          if (!fleet) {
            throw new HttpException('Fleet not found', HttpStatus.NOT_FOUND);
          }
        }
        fleet.vehicles.push(...vehicles);
        await manager.save(fleet);

        // Update the cache with the modified fleet
        await this.cacheManager.set(`fleet_${id}`, fleet);

        return fleet;
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
        'Error while adding vehicles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async createFleet(dto: CreateFleetDto): Promise<Fleet> {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const fleet = await manager.save(this.fleetRepository.target, dto);
        const vehicles = await manager.save(
          this.vehiclesRepository.target,
          dto.vehicles,
        );
        fleet.vehicles = vehicles;
        return fleet;
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
        'Error while creating fleet',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
