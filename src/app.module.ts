import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'; // or PrismaModule if using Prisma
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PrismaService } from './common/prisma.service'; // Import the PrismaService
import { DeliveryService } from './modules/delivery/delivery.service';
import { DeliveryController } from './modules/delivery/delivery.controller';

@Module({
  imports: [
    // Environment Variables Configuration
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Database Configuration (TypeORM example)
    TypeOrmModule.forRoot({
      type: 'postgres', // or your database type
      host: process.env.DB_HOST || 'localhost',
      port: +(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'delivery_db',
      autoLoadEntities: true,
      synchronize: true, // Disable in production
    }),

    // Application Modules
    AuthModule,          // Authentication and Authorization
    UsersModule,         // User Management (Admins, Drivers, Customers)
    OrdersModule,        // Order Management
    // DriversModule,       // Driver Features (location, availability)
    // NotificationsModule, // Notifications (SMS, Email, Push)
    // DatabaseModule,      // Database-specific logic (if needed)
  ],
  controllers: [DeliveryController], // Global controllers can be added here
  providers: [DeliveryService, PrismaService],   // Global providers (e.g., interceptors, guards) can go here
  exports: [PrismaService],   // Export it if other modules need it
})
export class AppModule {}
