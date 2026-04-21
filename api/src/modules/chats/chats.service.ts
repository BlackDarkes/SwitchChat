import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { type TypeCreateChatSchema } from "./common/dto/create-chat.dto";
import { v4 as uuid } from "uuid";
import { ChatsRepository } from "./chats.repository";
import { EnumRoleMember } from "@/app/generated/prisma/enums";

@Injectable()
export class ChatsService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly chatRepository: ChatsRepository,
	) {}

	async getOnlineMembers(chatId: string) {
		return this.prismaService.client.chatMember.findMany({
			where: { chatId, user: { isOnline: true } },
			include: { user: true },
		});
	}

	async create(data: TypeCreateChatSchema) {
		const { name, type, ownerId } = data;
		const id = uuid();
		const username = this.createUsername(id);

		return this.prismaService.client.chat.create({
			data: {
				name,
				username,
				type,
				ownerId,
				chatMembers: { create: { userId: ownerId, role: "OWNER" } },
			},
		});
	}

	async updateMemberRole(chatId: string, userId: string, role: EnumRoleMember) {
		return this.prismaService.client.chatMember.updateMany({
			where: { chatId, userId },
			data: { role },
		});
	}

	async updateLastSeenMessage(
		chatId: string,
		userId: string,
		messageId: string,
	) {
		return this.prismaService.client.chatMember.updateMany({
			where: { chatId, userId },
			data: { lastReadMessageId: messageId },
		});
	}

	async kikMember(chatId: string, userId: string, adminId: string) {
		const admin = await this.prismaService.client.chatMember.findFirst({
			where: { chatId, userId: adminId },
		});

		if (!admin || admin.role !== "OWNER") {
			throw new BadRequestException("У вас недостаточно прав");
		}

		return this.prismaService.client.chatMember.deleteMany({
			where: { chatId, userId },
		});
	}

	async joinChat(chatId: string, userId: string) {
		const member = await this.prismaService.client.chatMember.findFirst({
			where: { chatId, userId },
		});
		const chat = await this.prismaService.client.chat.findUnique({
			where: { id: chatId },
		});

		if (chat?.type === "SELF") {
			throw new BadRequestException("Нельзя присоединиться к личному чату");
		}

		if (!chat) {
			throw new BadRequestException("Чат не найден");
		}

		if (member) {
			return member;
		}

		return this.prismaService.client.chat.update({
			where: { id: chatId },
			data: { chatMembers: { create: { userId, role: "MEMBER" } } },
		});
	}

	async leaveChat(chatId: string, userId: string) {
		return this.prismaService.client.chatMember.deleteMany({
			where: { chatId, userId },
		});
	}

	async changeOwner(chatId: string, newOwnerId: string) {
		const chat = await this.prismaService.client.chat.findUnique({
			where: { id: chatId },
			select: { ownerId: true },
		});

		if (!chat || chat?.ownerId === newOwnerId) {
			return;
		}

		return this.prismaService.client.$transaction(async (tx) => {
			await tx.chat.update({
				where: { id: chatId },
				data: { ownerId: newOwnerId },
			});

			await tx.chatMember.updateMany({
				where: { chatId, userId: chat.ownerId },
				data: { role: "ADMIN" },
			});

			await tx.chatMember.updateMany({
				where: { chatId, userId: newOwnerId },
				data: { role: "OWNER" },
			});
		});
	}

	async addFavorite(chatId: string, userId: string) {
		const chat = await this.prismaService.client.chat.findUnique({
			where: { id: chatId },
		});

		if (!chat) {
			throw new BadRequestException("Чат не найден");
		}

		return this.prismaService.client.chat.update({
			where: { id: chatId },
			data: {
				chatMembers: {
					updateMany: { where: { userId }, data: { isFavorite: true } },
				},
			},
		});
	}

	async removeFavorite(chatId: string, userId: string) {
		const chat = await this.prismaService.client.chat.findUnique({
			where: { id: chatId },
		});

		if (!chat) {
			throw new BadRequestException("Чат не найден");
		}

		return this.prismaService.client.chat.update({
			where: { id: chatId },
			data: {
				chatMembers: {
					updateMany: { where: { userId }, data: { isFavorite: false } },
				},
			},
		});
	}

	async removeChat(chatId: string) {
		return this.prismaService.client.chat.deleteMany({ where: { id: chatId } });
	}

	private createUsername(id: string) {
		return `chat_${id.split("-")[0]}`;
	}
}
