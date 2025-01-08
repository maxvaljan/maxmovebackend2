import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Adjust the import path as needed
import { RolesGuard } from '../auth/roles.guard'; // Adjust the import path as needed
import { Roles } from '../auth/roles.decorator'; // Import the Roles decorator

@Controller('orders')
export class OrdersController {
  // This route is only accessible by users with the 'admin' or 'driver' roles
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard) // Apply both guards
  @Roles('admin', 'driver') // Specify which roles can access this endpoint
  findAll() {
    return 'This route is protected and only accessible by admin or driver roles!';
  }

  // Example: Public route (no guards applied)
  @Get('public')
  findPublic() {
    return 'This route is public and accessible to everyone!';
  }
}
