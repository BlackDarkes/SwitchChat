import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { type TypeCreateChatSchema } from "./common/dto/create-chat.dto";
import { v4 as uuid } from "uuid";
import { ChatRepository } from "./chat.repository";
import { EnumRoleMember } from "@/app/generated/prisma/enums";

@Injectable()
export class ChatsService {
	constructor(
    private readonly prismaService: PrismaService,
    private  readonly chatRepository: ChatRepository
  ) {}

  async getOnlineMembers(chatId: string) {
    return this.prismaService.client.chatMember.findMany({
      where: { chatId, user: {  isOnline: true } },
      include: { user: true },
    })
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
    })
  }

  async updateLastSeenMessage(chatId: string, userId: string, messageId: string) {
    return this.prismaService.client.chatMember.updateMany({
      where: { chatId, userId },
      data: { lastReadMessageId: messageId },
    })
  }

  async kikMember(chatId: string, userId: string) {
    const user = await this.prismaService.client.user.findUnique({
      where: { id: userId },
    })

    if (user?.role !== "ADMIN") {
      return;
    }

    return this.prismaService.client.chatMember.deleteMany({
      where: { chatId, userId },
    })
  }

	async joinChat(chatId: string, userId: string) {
    const chat = await this.prismaService.client.chat.findUnique({
      where: { id: chatId },
    });

    if (chat?.ownerId === userId) {
      return;
    }

		return this.prismaService.client.chat.update({
			where: { id: chatId },
			data: { chatMembers: { create: { userId, role: "MEMBER" } }, },
		});
	}

	async leaveChat(chatId: string, userId: string) {
		return this.prismaService.client.chatMember.deleteMany({
      where: { chatId, userId },
    })
	}

  async changeOwner(chatId: string, newOwnerId: string) {
    const chat = await this.prismaService.client.chat.findUnique({
      where: { id: chatId },
    })

    if (chat?.ownerId === newOwnerId) {
      return;
    }

    // Доделать
  }

	private createUsername(id: string) {
		return `chat_${id.split("-")[0]}`;
	}
}
