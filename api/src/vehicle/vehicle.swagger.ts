import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function SwaggerGetVehicles() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all Vehicles' }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved all Vehicles',
    }),
  );
}

export function SwaggerCreateVehicle() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a vehicle' }),
    ApiResponse({ status: 200, description: 'Vehicle created successfully' }),
    ApiResponse({ status: 500, description: 'Error creating the Vehicle' }),
  );
}

export function SwaggerUpdateStatus() {
  return applyDecorators(
    ApiOperation({ summary: 'Update status' }),
    ApiResponse({ status: 200, description: 'Status updated successfully' }),
    ApiResponse({
      status: 400,
      description: 'Status is already set to the requested value',
    }),
    ApiResponse({ status: 404, description: 'Vehicle not found' }),
    ApiResponse({ status: 500, description: 'Error updating status' }),
  );
}

export function SwaggerUpdateVehicle() {
  return applyDecorators(
    ApiOperation({ summary: 'Update vehicle' }),
    ApiResponse({ status: 200, description: 'vehicle updated successfully' }),
    ApiResponse({ status: 404, description: 'Vehicle not found' }),
    ApiResponse({ status: 500, description: 'Error updating Vehicle' }),
  );
}
