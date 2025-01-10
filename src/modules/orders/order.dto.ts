import { IsEnum } from 'class-validator';
import { OrderStatus } from './order-status.enum';

export class OrderDto {
    @IsEnum(OrderStatus)
    status!: OrderStatus;
}
