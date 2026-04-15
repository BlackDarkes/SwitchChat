import { Body, Controller, Get, HttpCode, Patch, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CurrentUser } from "@/app/common/decorators/current-user.decorator";
import { AuthGuard } from "@/app/common/guards/auth.guard";
import { UserRepository } from "./user.repository";
import { Prisma } from "@/app/generated/prisma/client";

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

	@Patch("")
	@HttpCode(200)
	async update(
		@CurrentUser("id") userId: string,
		@Body() data: Prisma.UserUpdateInput
	) {
		return this.userService.update(userId, data);
	}
}
