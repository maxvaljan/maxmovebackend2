import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { Delivery } from '@prisma/client';

@Injectable()
export class DeliveryService {
  constructor(private readonly prisma: PrismaService) {}

  // Assign a delivery to an agent
  async assignDelivery(orderId: string, deliveryAgent: string): Promise<Delivery> {
    const delivery = await this.prisma.delivery.create({
      data: {
        orderId,
        deliveryAgent,
        status: 'Out for Delivery', // Initial status
      },
    });

    return delivery;
  }

  // Update the delivery status
  async updateDeliveryStatus(deliveryId: string, status: string): Promise<Delivery> {
    const updatedDelivery = await this.prisma.delivery.update({
      where: { id: deliveryId },
      data: { status },
    });

    return updatedDelivery;
  }

  // Get a delivery's status by orderId
  async getDeliveryStatus(orderId: string): Promise<Delivery | null> {
    return this.prisma.delivery.findUnique({
      where: { orderId },
    });
  }

    // Find delivery by its unique `id`
  async trackDelivery(deliveryId: string) {
    return this.prisma.delivery.findUnique({
        where: { id: deliveryId },  // Use `id` instead of `orderId`
        });
    }
}
