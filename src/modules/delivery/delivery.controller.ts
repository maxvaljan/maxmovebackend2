import { Controller, Post, Patch, Param, Body, Get } from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Controller('deliveries')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  // Assign delivery to an agent
  @Post('assign/:orderId')
  async assignDelivery(
    @Param('orderId') orderId: string,
    @Body('deliveryAgent') deliveryAgent: string,
  ) {
    return this.deliveryService.assignDelivery(orderId, deliveryAgent);
  }

  // Update the status of a delivery
  @Patch('update-status/:deliveryId')
  async updateStatus(
    @Param('deliveryId') deliveryId: string,
    @Body('status') status: string,
  ) {
    return this.deliveryService.updateDeliveryStatus(deliveryId, status);
  }

  // Get the delivery status for a specific order
  @Get('status/:orderId')
  async getStatus(@Param('orderId') orderId: string) {
    return this.deliveryService.getDeliveryStatus(orderId);
  }

  // Track a specific delivery by ID
  @Get('track/:deliveryId')
  async trackDelivery(@Param('deliveryId') deliveryId: string) {
    return this.deliveryService.trackDelivery(deliveryId);
  }
}
