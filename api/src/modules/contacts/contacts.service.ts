import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ChatsService } from "../chats/chats.service";
import { ChatsRepository } from "../chats/chat.repository";

@Injectable()
export class ContactsService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly chatsService: ChatsService,
		private readonly chatsRepository: ChatsRepository,
	) {}

	async addContact(userId: string, contactId: string) {
		const chat = await this.chatsRepository.findDirectChat(userId, contactId);

		if (chat) throw new BadRequestException("Чат уже существует");

		const directChat = await this.chatsService.create({
			name: "",
			type: "DIRECT",
			ownerId: userId,
		});

		if (!directChat) throw new NotFoundException("Чат не найден");

		await this.chatsService.joinChat(directChat.id, contactId);

		return this.prismaService.client.contact.create({
			data: { ownerId: userId, contactId: contactId },
		});
	}

	async removeContact(userId: string, contactId: string) {
		const chat = await this.chatsRepository.findDirectChat(userId, contactId);

		if (!chat) throw new NotFoundException("Чат не найден");

		await this.chatsService.removeChat(chat.id);

		return this.prismaService.client.contact.deleteMany({
			where: { ownerId: userId, contactId: contactId },
		});
	}
}
