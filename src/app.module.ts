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

    // TypeORM Configuration
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || process.env.DIRECT_URL, // Use your .env variable
      ssl: {
        rejectUnauthorized: false, // Required for Supabase
      },
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Automatically sync schema (disable in production)
      logging: true, // Enable SQL query logging
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
