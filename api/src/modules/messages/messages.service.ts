import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { MessagesRepository } from "./messages.repository";
import { TypeCreateMessageSchema } from "./common/dto/create-message.dto";
import { TypeUpdateMessageSchema } from "./common/dto/update-message.dto";

@Injectable()
export class MessagesService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly messagesRepository: MessagesRepository,
	) {}

	async sendMessage(
		userId: string,
		chatId: string,
		data: TypeCreateMessageSchema,
	) {
    const { attachments, ...message } = data;

		const member = await this.prismaService.client.chatMember.findFirst({
			where: { chatId, userId },
		});

		if (!member) {
			throw new Error("Вы не являетесь участником этого чата");
		}

		return this.prismaService.client.$transaction(async (tx) => {
			const messageCreate = await tx.message.create({
				data: {
					...message,
					chatId,
					userId,
					attachments: attachments
						? {
								create: attachments.map((file) => ({
									...file,
									fileSize: Number(file.fileSize),
									mimeType: file.mimeType,
								})),
							}
						: undefined,
				},
				include: { attachments: true, user: true },
			});

			await tx.chat.update({
				where: { id: chatId },
				data: { updatedAt: new Date() },
			});

      return messageCreate;
		});
	}

	async editMessage(
		userId: string,
		messageId: string,
		data: TypeUpdateMessageSchema,
	) {
		const message =
			await this.messagesRepository.getMessageWithDetails(messageId);

		if (message?.userId !== userId) {
			throw new Error("Вы не можете редактировать чужое сообщение");
		}

    if (message.type === "SYSTEM" || message.type === "CALL_START") {
      throw new Error("Вы не можете редактировать это сообщение");
    }

		return this.messagesRepository.update(messageId, data);
	}

	async readMessage(userId: string, chatId: string, messageId: string) {
    const member = await this.prismaService.client.chatMember.findFirst({
      where: { id: userId, chatId },
    })

    if (!member) {
      throw new Error("Вы не являетесь участником этого чата");
    }

		return this.prismaService.client.chatMember.updateMany({
			where: { id: member.id },
			data: {
				lastReadMessageId: messageId,
			},
		});
	}

  async deleteMessage(userId: string, messageId: string) {
    const message = await this.messagesRepository.getMessageWithDetails(messageId);
    if (!message) return;

    const member = await this.prismaService.client.chatMember.findFirst({
      where: { chatId: message.chatId, userId },
    })

    if (message?.userId !== userId && member?.role !== "OWNER") {
      throw new Error("Вы не можете удалять чужое сообщение");
    }

    return this.messagesRepository.delete(messageId);
  }

	async addReaction(userId: string, messageId: string, emoji: string) {
		const reaction = await this.prismaService.client.reaction.findFirst({
			where: { messageId, userId, emoji },
		});

		if (reaction) {
			return this.prismaService.client.reaction.delete({
				where: { id: reaction.id },
			});
		}

		return this.prismaService.client.reaction.create({
			data: { messageId, userId, emoji },
		});
	}
}
