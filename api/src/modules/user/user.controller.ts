import { Controller, Get, HttpCode, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CurrentUser } from "@/app/common/decorators/current-user.decorator";
import { AuthGuard } from "@/app/common/guards/auth.guard";
import { UserRepository } from "./user.repository";

@Controller("user")
@UseGuards(AuthGuard)
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly userRepository: UserRepository,
	) {}

	@Get("/me")
	@HttpCode(200)
	async getById(
		@CurrentUser("id") userId: string
	) {
		const user = await this.userRepository.getById(userId);

		return {
			...user,
		};
	}

	@Get("search")
	@HttpCode(200)
	async search(
		@CurrentUser("id") userId: string,
		@Query("query") search: string
	) {
		return this.userRepository.searchUser(userId, search);
	}
}
