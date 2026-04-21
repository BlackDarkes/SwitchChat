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
import { TypeCreateChatSchema } from "./common/dto/create-chat.dto";
import { CurrentUser } from "@/app/common/decorators/current-user.decorator";
import { JwtGuard } from "../auth/common/guard/jwt.guard";
import { Prisma } from "@/app/generated/prisma/client";

@Controller("chats")
@UseGuards(JwtGuard)
export class ChatsController {
	constructor(private readonly chatsService: ChatsService) {}

	@Get("all")
	@HttpCode(200)
	async getAll() {
		return this.chatsService.getAll();
	}

	@Get("")
	@HttpCode(200)
	async getAllByUserId(@CurrentUser("id") userId: string) {
		return this.chatsService.getAllByUserId(userId);
	}

	@Get("favorite")
	@HttpCode(200)
	async getFavoriteChats(@CurrentUser("id") userId: string) {
		return this.chatsService.getFavoriteChats(userId);
	}

	@Get("self")
	@HttpCode(200)
	async getSelfChats(@CurrentUser("id") userId: string) {
		return this.chatsService.getSelfChats(userId);
	}

	@Get("direct")
	@HttpCode(200)
	async getDirectChats(@CurrentUser("id") userId: string) {
		return this.chatsService.getDirectChats(userId);
	}

	@Get("group")
	@HttpCode(200)
	async getChannelChats(@CurrentUser("id") userId: string) {
		return this.chatsService.getGroupChats(userId);
	}

	@Get("search")
	@HttpCode(200)
	async searchChats(
		@CurrentUser("id") userId: string,
		@Query("query") query: string,
	) {
		return this.chatsService.searchChats(userId, query);
	}

	@Get(":id")
	@HttpCode(200)
	async getChatInfo(@Param("id") chatId: string) {
		return this.chatsService.getChatWithFullInfo(chatId);
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

	@Patch(":id")
	@HttpCode(200)
	async update(@Param("id") id: string, @Body() data: Prisma.ChatUpdateInput) {
		return this.chatsService.update(id, data);
	}

	@Delete(":id/leave")
	@HttpCode(200)
	async leave(@Param("id") chatId: string, @CurrentUser("id") userId: string) {
		return this.chatsService.leaveChat(chatId, userId);
	}

	@Patch(":id/add-favorite")
	@HttpCode(200)
	async addFavorite(
		@Param("id") chatId: string,
		@CurrentUser("id") userId: string,
	) {
		return this.chatsService.addFavorite(chatId, userId);
	}

	@Patch(":id/remove-favorite")
	@HttpCode(200)
	async removeFavorite(
		@Param("id") chatId: string,
		@CurrentUser("id") userId: string,
	) {
		return this.chatsService.removeFavorite(chatId, userId);
	}
}
