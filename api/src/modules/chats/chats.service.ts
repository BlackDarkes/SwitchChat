import { BadRequestException, Injectable } from "@nestjs/common";
import { type TypeCreateChatSchema } from "./common/dto/create-chat.dto";
import { v4 as uuid } from "uuid";
import { ChatsRepository } from "./chats.repository";
import { ChatMemberRepository } from "../chat-member/chat-member.repository";
import { Prisma } from "@/app/generated/prisma/client";

@Injectable()
export class ChatsService {
	constructor(
		private readonly chatRepository: ChatsRepository,
		private readonly chatMemberRepository: ChatMemberRepository,
	) {}

	async getAll() {
		return this.chatRepository.getAll();
	}

	async getAllByUserId(userId: string) {
		return this.chatRepository.getAllByUserId(userId);
	}

	async getChatWithFullInfo(chatId: string) {
		return this.chatRepository.getChatWithFullInfo(chatId);
	}

	async getFavoriteChats(userId: string) {
		return this.chatRepository.getFavoriteChats(userId);
	}

	async getSelfChats(userId: string) {
		return this.chatRepository.getSelfChats(userId);
	}

	async getDirectChats(userId: string) {
		return this.chatRepository.getDirectChats(userId);
	}

	async getGroupChats(userId: string) {
		return this.chatRepository.getGroupChats(userId);
	}

	async getOnlineMembers(chatId: string) {
		return this.chatRepository.getOnlineMembers(chatId);
	}

	async searchChats(userId: string, search: string) {
		return this.chatRepository.searchChats(userId, search);
	}

	async findDirectChat(user1Id: string, user2Id: string) {
		return this.chatRepository.findDirectChat(user1Id, user2Id);
	}

	async create(data: TypeCreateChatSchema) {
		const { name, type, ownerId } = data;
		const id = uuid();
		const username = this.createUsername(id);

		if (!ownerId) throw new BadRequestException("Нет пользователя");

		return this.chatRepository.create({
			name,
			username,
			type,
			owner: { connect: { id: ownerId } },
			chatMembers: { create: { userId: ownerId, role: "OWNER" } },
		});
	}

	async joinChat(chatId: string, userId: string) {
		const member = await this.chatMemberRepository.getChatMember(
			chatId,
			userId,
		);
		const chat = await this.chatRepository.getChatWithFullInfo(chatId);

		if (chat?.type === "SELF") {
			throw new BadRequestException("Нельзя присоединиться к личному чату");
		}

		if (!chat) {
			throw new BadRequestException("Чат не найден");
		}

		if (member) {
			return member;
		}

		return this.chatRepository.update(chatId, {
			chatMembers: { create: { userId, role: "MEMBER" } },
		});
	}

	async update(id: string, data: Prisma.ChatUpdateInput) {
		return this.chatRepository.update(id, data);
	}

	async leaveChat(chatId: string, userId: string) {
		const chat = await this.chatRepository.getChatWithFullInfo(chatId);

		if (!chat) {
			throw new BadRequestException("Чат не найден");
		}

		const member = await this.chatMemberRepository.getChatMember(
			chatId,
			userId,
		);

		if (!member) {
			throw new BadRequestException("Вы не состоите в чате");
		}

		return this.chatRepository.delete(chatId, userId);
	}

	async changeOwner(chatId: string, newOwnerId: string) {
		const chat = await this.chatRepository.getChatWithFullInfo(chatId);

		if (!chat || chat?.ownerId === newOwnerId) {
			return;
		}

		return this.chatRepository.changeOwner(chatId, newOwnerId, chat);
	}

	async addFavorite(chatId: string, userId: string) {
		const chat = await this.chatRepository.getChatWithFullInfo(chatId);

		if (!chat) {
			throw new BadRequestException("Чат не найден");
		}

		return this.chatRepository.addFavorite(chatId, userId);
	}

	async removeFavorite(chatId: string, userId: string) {
		const chat = await this.chatRepository.getChatWithFullInfo(chatId);

		if (!chat) {
			throw new BadRequestException("Чат не найден");
		}

		return this.chatRepository.removeFavorite(chatId, userId);
	}

	async removeChat(chatId: string) {
		return this.chatRepository.deleteChat(chatId);
	}

	private createUsername(id: string) {
		return `chat_${id.split("-")[0]}`;
	}
}
