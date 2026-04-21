import { Body, Controller, Delete, HttpCode, Param, Patch } from "@nestjs/common";
import { ChatMemberService } from "./chat-member.service";
import { EnumRoleMember } from "@/app/generated/prisma/enums";
import { CurrentUser } from "@/app/common/decorators/current-user.decorator";

@Controller("chat-member")
export class ChatMemberController {
	constructor(private readonly chatMemberService: ChatMemberService) {}

	@Patch(":id/member/:targetUserId/role")
	@HttpCode(200)
	async updateRole(
		@Param("id") chatId: string,
		@Param("targetUserId") userId: string,
		@Body("role") role: EnumRoleMember,
	) {
		return this.chatMemberService.updateMemberRole(chatId, userId, role);
	}

	// Добавить @role("admin")
	@Delete(":id/kik/:targetUserId")
	@HttpCode(200)
	async kik(
		@Param("id") chatId: string,
		@Param("targetUserId") userId: string,
		@CurrentUser("id") adminId: string,
	) {
		return this.chatMemberService.kikMember(chatId, userId, adminId);
	}
}
