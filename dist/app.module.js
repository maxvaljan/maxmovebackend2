"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm"); // or PrismaModule if using Prisma
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const orders_module_1 = require("./modules/orders/orders.module");
const prisma_service_1 = require("./common/prisma.service"); // Import the PrismaService
const delivery_service_1 = require("./modules/delivery/delivery.service");
const delivery_controller_1 = require("./modules/delivery/delivery.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            // Environment Variables Configuration
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            // TypeORM Configuration
            typeorm_1.TypeOrmModule.forRoot({
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
            auth_module_1.AuthModule, // Authentication and Authorization
            users_module_1.UsersModule, // User Management (Admins, Drivers, Customers)
            orders_module_1.OrdersModule, // Order Management
            // DriversModule,       // Driver Features (location, availability)
            // NotificationsModule, // Notifications (SMS, Email, Push)
            // DatabaseModule,      // Database-specific logic (if needed)
        ],
        controllers: [delivery_controller_1.DeliveryController], // Global controllers can be added here
        providers: [delivery_service_1.DeliveryService, prisma_service_1.PrismaService], // Global providers (e.g., interceptors, guards) can go here
        exports: [prisma_service_1.PrismaService], // Export it if other modules need it
    })
], AppModule);
