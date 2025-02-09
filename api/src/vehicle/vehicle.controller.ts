import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleService } from './vehicle.service';
import { UpdateStatusDto } from './dto/update-status.dto';
import {
  SwaggerGetVehicles,
  SwaggerCreateVehicle,
  SwaggerUpdateStatus,
  SwaggerUpdateVehicle,
} from './vehicle.swagger';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get('getHistoryStatus/:id')
  async getHistoryStatus(@Param('id') id: string) {
    return this.vehicleService.getStatusHistory(id);
  }
  @Patch('updateStatus/:id')
  @SwaggerUpdateStatus()
  async updateStatus(@Param('id') id, @Body() dto: UpdateStatusDto) {
    return this.vehicleService.updateStatus(id, dto.status);
  }
  @Put(':id')
  @SwaggerUpdateVehicle()
  async updateVehicle(@Param('id') id: string, @Body() dto: UpdateVehicleDto) {
    return this.vehicleService.updateVehicle(id, dto);
  }

  @Delete(':id')
  async deleteVehicle(@Param('id') id: string) {
    return this.vehicleService.deleteVehicle(id);
  }
}
