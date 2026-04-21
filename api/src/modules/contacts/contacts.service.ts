import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { ChatsService } from "../chats/chats.service";
import { ChatsRepository } from "../chats/chats.repository";
import { ContactsRepository } from "./contacts.repository";

@Injectable()
export class ContactsService {
	constructor(
		private readonly chatsService: ChatsService,
		private readonly chatsRepository: ChatsRepository,
		private readonly contactsRepository: ContactsRepository,
	) {}

	async getUserContacts(userId: string) {
		return this.contactsRepository.getUserContacts(userId);
	}

	async searchContact(userId: string, search: string) {
		if (!search.trim()) return [];

		return this.contactsRepository.searchContact(userId, search);
	}

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

		return this.contactsRepository.addContact(userId, contactId);
	}

	async removeContact(userId: string, contactId: string) {
		const chat = await this.chatsRepository.findDirectChat(userId, contactId);

		if (!chat) throw new NotFoundException("Чат не найден");

		await this.chatsService.removeChat(chat.id);

		return this.contactsRepository.removeContact(userId, contactId);
	}
}
