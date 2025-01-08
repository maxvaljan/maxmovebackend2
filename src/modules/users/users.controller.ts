import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string; role: string }) {
    return this.usersService.createUser(body.email, body.password, body.role);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.usersService.findByEmail(id); // Adjust as needed to fetch by ID
  }

  @Patch(':id/role')
  async updateRole(@Param('id') id: string, @Body() body: { role: string }) {
    return this.usersService.updateUserRole(Number(id), body.role);
  }
}
