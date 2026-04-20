import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@/app/generated/prisma/client";

@Injectable()
export class SessionRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async findSessionId(userId: string, userAgent: string) {
		return this.prismaService.client.userSession.findFirst({
			where: { id: userId, userAgent },
			select: { id: true },
		});
	}

  async findSessionbyRefreshToken(refreshToken: string) {
    return this.prismaService.client.userSession.findFirst({
      where: { refreshToken },
    });
  }

  async create(data: Prisma.UserSessionCreateInput) {
    this.prismaService.client.userSession.create({
			data
		});
  }

	async updateSession(userId: string, refreshToken: string, userAgent: string) {
		return this.prismaService.client.userSession.create({
			data: { userId, refreshToken, userAgent },
		});
	}

	async removeSession(refreshToken: string) {
		return this.prismaService.client.userSession.deleteMany({
			where: { refreshToken },
		});
	}
}
