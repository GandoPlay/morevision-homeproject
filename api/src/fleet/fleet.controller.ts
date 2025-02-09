import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FleetService } from './fleet.service';
import { CreateFleetDto } from './dto/create-fleet.dto';
import {
  SwaggerAddVehicles,
  SwaggerCreateFleet,
  SwaggerGetVehicles,
} from './fleet.swagger';
import { AddVehiclesDto } from './dto/add-vehicles.dto';
import { GetVehiclesDto } from './dto/get-vehicles.dto';
import { VehicleStatus } from 'src/entities/vehicle-status-history.entity';

@Controller('fleet')
export class FleetController {
  constructor(private readonly fleetService: FleetService) {}
  @Post('addVehicles/:id')
  @SwaggerAddVehicles()
  async addVehicles(@Param('id') id, @Body() dto: AddVehiclesDto) {
    return this.fleetService.addVehicles(id, dto.vehicles);
  }

  @Get()
  async getFleets() {
    return this.fleetService.getFleets();
  }
  @Get('getVehicles/:id')
  @SwaggerGetVehicles()
  async getVehicles(@Param('id') id, @Query('status') query?: VehicleStatus) {
    return this.fleetService.getAllVehiclesInFleet(id, query);
  }
  @Get('getPrefix')
  async getFleetsWithPrefix(@Query('prefix') query?: string) {
    return this.fleetService.getFleetsWithVehiclesByLicensePlatePrefix(query);
  }
  @Post()
  @SwaggerCreateFleet()
  async createFleet(@Body() dto: CreateFleetDto) {
    return this.fleetService.createFleet(dto);
  }
}
