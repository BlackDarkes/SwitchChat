import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SessionService {
	constructor(private readonly prismaService: PrismaService) {}

	async updateSession(userId: string, refreshToken: string, userAgent: string) {
		const existingSession =
			await this.prismaService.client.userSession.findFirst({
				where: { userId, userAgent },
			});

		if (existingSession) {
			return this.prismaService.client.userSession.update({
				where: { id: existingSession.id },
				data: { refreshToken },
			});
		}

		return this.prismaService.client.userSession.create({
			data: { userId, refreshToken, userAgent },
		});
	}

	async findSessionId(userId: string, userAgent: string) {
		const session = await this.prismaService.client.userSession.findFirst({
			where: { userId, userAgent },
			select: { id: true },
		});

    return session?.id;
	}

	async removeSession(refreshToken: string) {
    return this.prismaService.client.userSession.deleteMany({
      where: { refreshToken },
    })
  }
}
