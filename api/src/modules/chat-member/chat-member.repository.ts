import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { EnumRoleMember, Prisma } from "@/app/generated/prisma/client";

@Injectable()
export class ChatMemberRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async getChatMembers(chatId: string) {
		return this.prismaService.client.chatMember.findMany({ where: { chatId } });
	}

	async getChatMember(chatId: string, userId: string) {
		return this.prismaService.client.chatMember.findFirst({
			where: { chatId, userId },
		});
	}

	async create(data: Prisma.ChatMemberCreateInput) {
		return this.prismaService.client.chatMember.create({ data });
	}

	async updateRole(chatId: string, userId: string, role: EnumRoleMember) {
		return this.prismaService.client.chatMember.updateMany({
			where: { chatId, userId },
			data: { role },
		});
	}

  async updateLastSeenMessage(chatId: string, userId: string, messageId: string) {
    return this.prismaService.client.chatMember.updateMany({
      where: { chatId, userId },
      data: { lastReadMessageId: messageId },
    });
  }

	async delete(chatId: string, userId: string) {
		return this.prismaService.client.chatMember.deleteMany({
			where: { chatId, userId },
		});
	}
}
