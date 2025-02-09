import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function SwaggerGetVehicles() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all Vehicles For a Fleet' }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved all Fleets',
    }),
    ApiResponse({ status: 404, description: 'Fleet not found' }),
  );
}

export function SwaggerCreateFleet() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a Fleet' }),
    ApiResponse({ status: 200, description: 'Fleet created successfully' }),
    ApiResponse({ status: 500, description: 'Error creating the Fleet' }),
  );
}

export function SwaggerAddVehicles() {
  return applyDecorators(
    ApiOperation({ summary: 'Add vehicles' }),
    ApiResponse({ status: 200, description: 'Vehicles Added successfully' }),
    ApiResponse({ status: 500, description: 'Error adding Vehicles' }),
  );
}

export function SwaggerUpdateFleet() {
  return applyDecorators(
    ApiOperation({ summary: 'Update Fleet' }),
    ApiResponse({ status: 200, description: 'Fleet updated successfully' }),
    ApiResponse({ status: 404, description: 'Fleet not found' }),
    ApiResponse({ status: 500, description: 'Error updating Fleet' }),
  );
}
