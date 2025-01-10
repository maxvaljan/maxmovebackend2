import { IsString, IsNotEmpty, IsNumber, IsArray, IsEnum } from 'class-validator';

// Create a local enum
export enum OrderStatus {
  pending = 'pending',
  completed = 'completed',
  cancelled = 'cancelled',
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customerId: string = '';

  @IsString()
  @IsNotEmpty()
  pickupAddress: string = '';

  @IsString()
  @IsNotEmpty()
  dropoffAddress: string = '';

  @IsNumber()
  @IsNotEmpty()
  price: number = 0;

  @IsNumber()
  @IsNotEmpty()
  pickupLatitude: number = 0;

  @IsNumber()
  @IsNotEmpty()
  pickupLongitude: number = 0;

  @IsNumber()
  @IsNotEmpty()
  dropoffLatitude: number = 0;

  @IsNumber()
  @IsNotEmpty()
  dropoffLongitude: number = 0;

  @IsArray()
  @IsNotEmpty()
  items: any[] = [];

  @IsString()
  @IsNotEmpty()
  status: OrderStatus = OrderStatus.pending; // Example default
  
}

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status!: OrderStatus;
}