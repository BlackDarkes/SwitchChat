import { Body, Controller, Delete, Get, HttpCode, Post, UseGuards } from "@nestjs/common";
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
  async getContacts(
    @CurrentUser("id") userId: string
  ) {
    const contacts = await this.contactsRepository.getUserContacts(userId);

    return contacts;
  }

  @Post("")
  @HttpCode(201)
  async addContact(
    @CurrentUser("id") userId: string,
    @Body("contactId") contactId: string
  ) {
    await this.contactsService.addContact(userId, contactId);
    
    return {
      message: "Контакт успешно добавлен",
    }
  }

  @Delete("")
  @HttpCode(200)
  async removeContact(
    @CurrentUser("id") userId: string,
    @Body("contactId") contactId: string
  ) {
    await this.contactsService.removeContact(userId, contactId);

    return {
      message: "Контакт успешно удален",
    }
  }
}
