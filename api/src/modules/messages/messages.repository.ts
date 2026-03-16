import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Message } from "@/app/generated/prisma/client";
import { TypeCreateMessageSchema } from "./common/dto/create-message.dto";
import { TypeUpdateMessageSchema } from "./common/dto/update-message.dto";

@Injectable()
export class MessagesRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async getChatMessage(
		chatId: string,
		limit: number,
		cursor?: string,
	): Promise<Message[] | null> {
		return this.prismaService.client.message.findMany({
			where: { chatId },
			take: limit,
			cursor: cursor ? { id: cursor } : undefined,
			orderBy: { createdAt: "asc" },
			include: { user: true },
		});
	}

	async getMessageWithDetails(messageId: string): Promise<Message | null> {
		return this.prismaService.client.message.findUnique({
			where: { id: messageId },
			include: { user: true, attachments: true, reactions: true },
		});
	}

	async create(chatId: string, userId: string, data: TypeCreateMessageSchema) {
		const { attachments, ...message } = data;

		return this.prismaService.client.message.create({
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
	}

	async update(messageId: string, data: TypeUpdateMessageSchema) {
		return this.prismaService.client.message.update({
			where: { id: messageId },
			data: { ...data, isEdited: true },
		});
	}

	async delete(messageId: string) {
		return this.prismaService.client.message.delete({
			where: { id: messageId },
		});
	}
}
