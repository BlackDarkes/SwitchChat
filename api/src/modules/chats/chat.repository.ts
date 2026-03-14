import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Chat } from "@/app/generated/prisma/client";

@Injectable()
export class ChatRepository {
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
				chatMembers: true,
				messages: {
					take: 1,
					orderBy: { createdAt: "desc" },
					include: { user: true },
				},
			},
		});
	}

	async getFavoriteChats(userId: string): Promise<Chat | null> {
		return this.prismaService.client.chat.findFirst({
			where: { chatMembers: { some: { userId, isFavorite: true } } },
		})
	}

	async getSelfChats(userId: string): Promise<Chat[] | null> {
		return this.prismaService.client.chat.findMany({
			where: { chatMembers: { some: { userId } }, type: "SELF" },
		});
	}

	async getChannelChats(userId: string): Promise<Chat[] | null> {
		return this.prismaService.client.chat.findMany({
			where: { chatMembers: { some: { userId } }, type: { in: ["CHANNEL", "GROUP"] } },
		});
	}

	async searchChats(userId: string, search: string): Promise<Chat[] | null> {
		return this.prismaService.client.chat.findMany({
			where: {
				AND: [
					{
						OR: [
							{ name: { contains: search, mode: "insensitive" } },
							{ username: { contains: search, mode: "insensitive" } },
						],
					},
					{
						OR: [
							{ type: { in: ["DIRECT", "CHANNEL"] } },
							{ chatMembers: { some: { userId } } },
						],
					},
				],
			},
			take: 20,
		});
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
