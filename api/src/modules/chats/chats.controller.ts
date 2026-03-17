import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common";
import { ChatsService } from "./chats.service";
import { ChatRepository } from "./chat.repository";
import { TypeCreateChatSchema } from "./common/dto/create-chat.dto";
import { CurrentUser } from "@/app/common/decorators/current-user.decorator";
import { EnumRoleMember } from "@/app/generated/prisma/enums";
import { JwtGuard } from "../auth/common/guard/jwt.guard";

@Controller("chats")
@UseGuards(JwtGuard)
export class ChatsController {
	constructor(
		private readonly chatsService: ChatsService,
		private readonly chatRepository: ChatRepository,
	) {}

	@Get("all")
	@HttpCode(200)
	async getAll() {
		const chats = await this.chatRepository.getAll();

		return {
			chats,
		};
	}

	@Get("")
	@HttpCode(200)
	async getAllByUserId(@CurrentUser("id") userId: string) {
		const chats = await this.chatRepository.getAllByUserId(userId);

		return {
			chats,
		};
	}

	@Get("favorite")
	@HttpCode(200)
	async getFavoriteChats(@CurrentUser("id") userId: string) {
		const chat = await this.chatRepository.getFavoriteChats(userId);

		return chat;
	}

	@Get("self")
	@HttpCode(200)
	async getSelfChats(@CurrentUser("id") userId: string) {
		const chat = await this.chatRepository.getSelfChats(userId);

		return chat;
	}

	@Get("direct")
	@HttpCode(200)
	async getDirectChats(@CurrentUser("id") userId: string) {
		const chats = await this.chatRepository.getDirectChats(userId);

		return chats;
	}

	@Get("group")
	@HttpCode(200)
	async getChannelChats(@CurrentUser("id") userId: string) {
		const chats = await this.chatRepository.getGroupChats(userId);

		return chats;
	}

	@Get("search")
	@HttpCode(200)
	async searchChats(
		@CurrentUser("id") userId: string,
		@Query("query") query: string,
	) {
		return this.chatRepository.searchChats(userId, query);
	}

	@Get(":id")
	@HttpCode(200)
	async getChatInfo(@Param("id") chatId: string) {
		const chat = await this.chatRepository.getChatWithFullInfo(chatId);

		return chat;
	}

	@Post("")
	@HttpCode(201)
	async create(
		@Body() data: TypeCreateChatSchema,
		@CurrentUser("id") userId: string,
	) {
		const chat = await this.chatsService.create({ ...data, ownerId: userId });

		return {
			message: "Чат успешно создан",
			chat,
		};
	}

	@Post(":id/join")
	@HttpCode(201)
	async join(@Param("id") id: string, @CurrentUser("id") userId: string) {
		return this.chatsService.joinChat(id, userId);
	}

	@Delete(":id/leave")
	@HttpCode(200)
	async leave(@Param("id") chatId: string, @CurrentUser("id") userId: string) {
		return this.chatsService.leaveChat(chatId, userId);
	}

	// Добавить @role("admin")
	@Delete(":id/kik/:targetUserId")
	@HttpCode(200)
	async kik(
		@Param("id") chatId: string,
		@Param("targetUserId") userId: string,
		@CurrentUser("id") adminId: string,
	) {
		return this.chatsService.kikMember(chatId, userId, adminId);
	}

	@Patch(":id/member/:targetUserId/role")
	@HttpCode(200)
	async updateRole(
		@Param("id") chatId: string,
		@Param("targetUserId") userId: string,
		@Body("role") role: EnumRoleMember,
	) {
		return this.chatsService.updateMemberRole(chatId, userId, role);
	}
}
