import { BadRequestException, Injectable } from "@nestjs/common";
import { SessionRepository } from "./session.repository";

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

	async updateSession(userId: string, refreshToken: string, userAgent: string) {
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
		const existingSession =
			await this.sessionRepository.findSessionbyRefreshToken(refreshToken);

		if (!existingSession) {
			throw new BadRequestException("Сессия не найдена");
		}

		return this.sessionRepository.removeSession(refreshToken);
	}
}
