import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Chat } from "@/app/generated/prisma/client";
import { ChatCreateInput } from "@/app/generated/prisma/models";

@Injectable()
export class ChatsService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAll(): Promise<Chat[] | null> {
		return this.prismaService.client.chat.findMany({
      include: {
        messages: { take: 1, orderBy: { createdAt: "desc" } },
        chatMembers: { include: {  user: true} },
      }
    });
	}

	async getAllByUserId(userId: string): Promise<Chat[] | null> {
		return this.prismaService.client.chat.findMany({
      where: { chatMembers: { some: { userId } } },
      include: {
        messages: { take: 1, orderBy: { createdAt: "desc" } },
        chatMembers: { include: {  user: true} },
      },
      orderBy: { updatedAt: "desc" },
    })
	}

  async create(data: ChatCreateInput) {
    return this.prismaService.client.chat.create({ data });
  }
}
