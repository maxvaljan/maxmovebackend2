import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async createUser(@Body() body: { email: string; password: string; role: string; name?: string; phone?: string; userType?: string }) {
    const { email, password, role, name, phone, userType } = body;

    if (!name || !phone || !userType) {
      // Default values for registration
      return this.usersService.createUser(email, password, role, 'Default Name', '0000000000', 'customer');
    }

    return this.usersService.createUser(email, password, role, name, phone, userType);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id); // Fetch user by ID
  }

  @Patch(':id/role')
  async updateRole(@Param('id') id: string, @Body() body: { role: string }) {
    return this.usersService.updateUserRole(id, body.role); // Pass id as a string
  }
}
