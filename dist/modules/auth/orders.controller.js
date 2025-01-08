"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard"); // Adjust the import path as needed
const roles_guard_1 = require("../auth/roles.guard"); // Adjust the import path as needed
const roles_decorator_1 = require("../auth/roles.decorator"); // Import the Roles decorator
let OrdersController = class OrdersController {
    // This route is only accessible by users with the 'admin' or 'driver' roles
    findAll() {
        return 'This route is protected and only accessible by admin or driver roles!';
    }
    // Example: Public route (no guards applied)
    findPublic() {
        return 'This route is public and accessible to everyone!';
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard) // Apply both guards
    ,
    (0, roles_decorator_1.Roles)('admin', 'driver') // Specify which roles can access this endpoint
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('public'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findPublic", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('orders')
], OrdersController);
