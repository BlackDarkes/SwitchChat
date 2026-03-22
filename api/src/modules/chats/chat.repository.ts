import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Chat, EnumChatTypes } from "@/app/generated/prisma/client";
import { QueryMode } from "@/app/generated/prisma/internal/prismaNamespace";

@Injectable()
export class ChatsRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async getAll(): Promise<Chat[] | null> {
		return this.prismaService.client.chat.findMany({
			include: {
				messages: { take: 1, orderBy: { createdAt: "desc" } },
				chatMembers: { include: { user: true } },
			},
		});
	}

	async getAllByUserId(userId: string): Promise<Chat[] | null> {
		return this.prismaService.client.chat.findMany({
			where: { chatMembers: { some: { userId } } },
			include: {
				messages: { take: 1, orderBy: { createdAt: "desc" } },
				chatMembers: { include: { user: true } },
			},
			orderBy: { updatedAt: "desc" },
		});
	}

	async getChatWithFullInfo(chatId: string): Promise<Chat | null> {
		return this.prismaService.client.chat.findUnique({
			where: { id: chatId },
			include: {
				chatMembers: { include: { user: true } },
				messages: {
					take: 1,
					orderBy: { createdAt: "desc" },
					include: { user: true },
				},
			},
		});
	}

	async getFavoriteChats(userId: string): Promise<Chat[] | null> {
		return this.prismaService.client.chat.findMany({
			where: { chatMembers: { some: { userId, isFavorite: true } } },
		});
	}

	async getSelfChats(userId: string): Promise<Chat | null> {
		return this.prismaService.client.chat.findFirst({
			where: { chatMembers: { some: { userId } }, type: "SELF" },
		});
	}

	async getDirectChats(userId: string): Promise<Chat[] | null> {
		return this.prismaService.client.chat.findMany({
			where: { chatMembers: { some: { userId } }, type: "DIRECT" },
			include: {
				messages: { take: 1, orderBy: { createdAt: "desc" } },
				chatMembers: { include: { user: true } },
			},
			orderBy: { updatedAt: "desc" },
		});
	}

	async getGroupChats(userId: string): Promise<Chat[] | null> {
		return this.prismaService.client.chat.findMany({
			where: {
				chatMembers: { some: { userId } },
				type: { in: ["CHANNEL", "GROUP"] },
			},
			include: {
				messages: { take: 1, orderBy: { createdAt: "desc" } },
				chatMembers: { include: { user: true } },
			},
			orderBy: { updatedAt: "desc" },
		});
	}

	async searchChats(userId: string, search: string): Promise<Chat[] | null> {
		const searchFilter = {
			OR: [
				{ name: { contains: search, mode: QueryMode.insensitive } },
				{ username: { contains: search, mode: QueryMode.insensitive } },
			],
		};

		const visibilityFilter = {
			OR: [
				{ type: EnumChatTypes.SELF, ownerId: userId },
				{ type: EnumChatTypes.DIRECT, chatMembers: { some: { userId } } },
				{ type: { in: [EnumChatTypes.GROUP, EnumChatTypes.CHANNEL] } },
			],
		};

		const memberChats = await this.prismaService.client.chat.findMany({
			where: {
				AND: [
					searchFilter,
					visibilityFilter,
					{ chatMembers: { some: { userId } } },
				],
			},
			take: 20,
		});

		const nonMemberChats = await this.prismaService.client.chat.findMany({
			where: {
				AND: [
					searchFilter,
					{ type: { in: [EnumChatTypes.GROUP, EnumChatTypes.CHANNEL] } }, 
					{ chatMembers: { none: { userId } } }, 
				],
			},
			take: 20,
		});

		const combined = [...memberChats, ...nonMemberChats];
		const unique = Array.from(
			new Map(combined.map((chat) => [chat.id, chat])).values(),
		);

		return unique.slice(0, 20);
	}

	async findDirectChat(user1Id: string, user2Id: string): Promise<Chat | null> {
		return this.prismaService.client.chat.findFirst({
			where: {
				type: "DIRECT",
				AND: [
					{ chatMembers: { some: { userId: user1Id } } },
					{ chatMembers: { some: { userId: user2Id } } },
				],
			},
		});
	}
}
