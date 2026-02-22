import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@/app/generated/prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async getAll() {
    return this.prismaService.client.user.findMany();
  }

  async getById(id: string) {
    return this.prismaService.client.user.findUnique({ where: { id } });
  }

  async getByEmail(email: string) {
    return this.prismaService.client.user.findUnique({ where: {email } });
  }

  async getByUsername(username: string) {
    return this.prismaService.client.user.findUnique({ where: { username } });
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prismaService.client.user.create({ data });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return this.prismaService.client.user.update({ where: { id }, data });
  }

  async updateUsername(id: string, username: string) {
    return this.prismaService.client.user.update({ where: { id }, data: { username } });
  }

  async remove(id: string) {
    return this.prismaService.client.user.delete({ where: { id } });
  }
}
