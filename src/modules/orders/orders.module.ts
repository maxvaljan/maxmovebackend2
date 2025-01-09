import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PrismaService } from '../../common/prisma.service'; // Ensure you have PrismaService available

@Module({
  controllers: [OrdersController], // Registers the controller
  providers: [OrdersService, PrismaService], // Registers the service and PrismaService
  exports: [OrdersService], // Exports OrdersService if needed by other modules
})
export class OrdersModule {}
