import { BadRequestException, Injectable } from "@nestjs/common";
import { SessionRepository } from "./session.repository";
import { Request } from "express";
import { Prisma } from "@/app/generated/prisma/client";

@Injectable()
export class SessionService {
	constructor(private readonly sessionRepository: SessionRepository) {}

	async findSessionId(userId: string, userAgent: string) {
		const session = await this.sessionRepository.findSessionId(
			userId,
			userAgent,
		);

		return session?.id;
	}

	async findSessionbyRefreshToken(refreshToken: string) {
		return this.sessionRepository.findSessionbyRefreshToken(refreshToken);
	}

	async create(data: Prisma.UserSessionCreateInput) {
		return this.sessionRepository.create(data);
	}

	async updateSession(userId: string, req: Request, userAgent: string) {
		const refreshToken = req?.cookies?.["refresh_token"];
		const existingSession = await this.sessionRepository.findSessionId(
			userId,
			userAgent,
		);

		if (existingSession) {
			return this.sessionRepository.updateSession(
				userId,
				refreshToken,
				userAgent,
			);
		}

		return this.sessionRepository.create({
			id: userId,
			refreshToken,
			userAgent,
			user: { connect: { id: userId } },
		});
	}

	async removeSession(refreshToken: string) {
		return this.sessionRepository.removeSession(refreshToken);
	}
}
