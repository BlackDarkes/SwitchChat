import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common";
import { ContactsService } from "./contacts.service";
import { ContactsRepository } from "./contacts.repository";
import { CurrentUser } from "@/app/common/decorators/current-user.decorator";
import { JwtGuard } from "../auth/common/guard/jwt.guard";

@Controller("contacts")
@UseGuards(JwtGuard)
export class ContactsController {
	constructor(
		private readonly contactsService: ContactsService,
		private readonly contactsRepository: ContactsRepository,
	) {}

	@Get("")
	@HttpCode(200)
	async getContacts(@CurrentUser("id") userId: string) {
		const contacts = await this.contactsRepository.getUserContacts(userId);

		return contacts;
	}

	@Get("search")
	@HttpCode(200)
	async search(
		@CurrentUser("id") userId: string,
		@Query("query") search: string,
	) {
		return this.contactsRepository.searchContact(userId, search);
	}

	@Post("")
	@HttpCode(201)
	async addContact(
		@CurrentUser("id") userId: string,
		@Body("contactId") contactId: string,
	) {
		await this.contactsService.addContact(userId, contactId);

		return {
			message: "Контакт успешно добавлен",
		};
	}

	@Delete("")
	@HttpCode(200)
	async removeContact(
		@CurrentUser("id") userId: string,
		@Body("contactId") contactId: string,
	) {
		await this.contactsService.removeContact(userId, contactId);

		return {
			message: "Контакт успешно удален",
		};
	}
}
