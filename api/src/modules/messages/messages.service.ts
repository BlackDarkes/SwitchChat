import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { MessagesRepository } from "./messages.repository";
import { TypeCreateMessageSchema } from "./common/dto/create-message.dto";
import { TypeUpdateMessageSchema } from "./common/dto/update-message.dto";
import { ChatsGateway } from "../chats/chats.gateway";
import { ChatMemberRepository } from "../chat-member/chat-member.repository";

@Injectable()
export class MessagesService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly messagesRepository: MessagesRepository,
		private readonly chatMembersRepository: ChatMemberRepository,
		private readonly chatsGateway: ChatsGateway,
	) {}

	async getChatMessage(chatId: string, limit: number, cursor?: string) {
		return this.messagesRepository.getChatMessage(chatId, limit, cursor);
	}

	async getMessageWithDetails(messageId: string) {
		return this.messagesRepository.getMessageWithDetails(messageId);
	}

	async sendMessage(
		userId: string,
		chatId: string,
		data: TypeCreateMessageSchema,
	) {
		const { attachments, ...message } = data;

		const member = await this.chatMembersRepository.getChatMember(chatId, userId);

		if (!member) {
			throw new BadRequestException("Вы не являетесь участником этого чата");
		}

		const messageCreate = await this.prismaService.client.$transaction(
			async (tx) => {
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
			},
		);

		this.chatsGateway.emitNewMessage(chatId, messageCreate);

		return messageCreate;
	}

	async editMessage(
		userId: string,
		messageId: string,
		data: TypeUpdateMessageSchema,
	) {
		const message =
			await this.messagesRepository.getMessageWithDetails(messageId);

		if (message?.userId !== userId) {
			throw new BadRequestException(
				"Вы не можете редактировать чужое сообщение",
			);
		}

		if (message.type === "SYSTEM" || message.type === "CALL_START") {
			throw new BadRequestException("Вы не можете редактировать это сообщение");
		}

		const updated = await this.messagesRepository.update(messageId, data);

		this.chatsGateway.emitMessageUpdated(message.chatId, updated);

		return updated;
	}

	async readMessage(userId: string, chatId: string, messageId: string) {
		const member = await this.chatMembersRepository.getChatMember(chatId, userId);

		if (!member) {
			throw new BadRequestException("Вы не являетесь участником этого чата");
		}

		return this.chatMembersRepository.updateLastSeenMessage(chatId, userId, messageId);
	}

	async deleteMessage(userId: string, messageId: string) {
		const message =
			await this.messagesRepository.getMessageWithDetails(messageId);

		if (!message) return;

		const member = await this.chatMembersRepository.getChatMember(
			message.chatId,
			userId,
		);

		if (message?.userId !== userId && member?.role !== "OWNER") {
			throw new BadRequestException("Вы не можете удалять чужое сообщение");
		}

		this.chatsGateway.emitMessageDeleted(message.chatId, messageId);

		return this.messagesRepository.delete(messageId);
	}
}
