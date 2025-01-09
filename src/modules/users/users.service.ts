import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service'; // Prisma for database interaction
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(
    email: string,
    password: string,
    role: string,
    name: string,
    phone: string,
    userType: 'customer' | 'driver',
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        name,
        phone,
        user_type: userType,
      },
    });
  }

  async updateUserRole(userId: string, role: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { role },
    });
  }
}
