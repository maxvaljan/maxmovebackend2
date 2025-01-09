import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController],
  exports: [OrdersService], // Export OrdersService if other modules need it
})
export class OrdersModule {}
