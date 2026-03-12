import { Controller, Get, HttpCode, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CurrentUser } from "@/app/common/decorators/current-user.decorator";
import { AuthGuard } from "@/app/common/guards/auth.guard";

@Controller("user")
@UseGuards(AuthGuard)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get("/me")
	@HttpCode(200)
	async getById(
		@CurrentUser("id") userId: string
	) {
		const user = await this.userService.getById(userId);

		return {
			...user,
		};
	}
}
