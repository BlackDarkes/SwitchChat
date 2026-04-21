import { Controller, HttpCode, Param, Post } from "@nestjs/common";
import { ReactionService } from "./reaction.service";
import { CurrentUser } from "@/app/common/decorators/current-user.decorator";

@Controller("reaction")
export class ReactionController {
	constructor(private readonly reactionService: ReactionService) {}

	@Post(":id/react/:emoji")
	@HttpCode(201)
	async react(
		@Param("id") messageId: string,
		@Param("emoji") emoji: string,
		@CurrentUser("id") userId: string,
	) {
		return this.reactionService.addReaction(userId, messageId, emoji);
	}
}
