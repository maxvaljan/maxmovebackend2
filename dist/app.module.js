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
            // Database Configuration (TypeORM example)
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres', // or your database type
                host: process.env.DB_HOST || 'localhost',
                port: +process.env.DB_PORT || 5432,
                username: process.env.DB_USERNAME || 'postgres',
                password: process.env.DB_PASSWORD || 'password',
                database: process.env.DB_NAME || 'delivery_db',
                autoLoadEntities: true,
                synchronize: true, // Disable in production
            }),
            // Application Modules
            auth_module_1.AuthModule, // Authentication and Authorization
            users_module_1.UsersModule, // User Management (Admins, Drivers, Customers)
            OrdersModule, // Order Management
            DriversModule, // Driver Features (location, availability)
            NotificationsModule, // Notifications (SMS, Email, Push)
            DatabaseModule, // Database-specific logic (if needed)
        ],
        controllers: [], // Global controllers can be added here
        providers: [], // Global providers (e.g., interceptors, guards) can go here
    })
], AppModule);
