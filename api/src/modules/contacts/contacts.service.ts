import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ContactsService {
	constructor(private readonly prismaService: PrismaService) {}

	async addContact(userId: string, contactId: string) {
		return this.prismaService.client.contact.create({
			data: { ownerId: userId, contactId: contactId },
		});
	}

	async removeContact(userId: string, contactId: string) {
		return this.prismaService.client.contact.deleteMany({
			where: { ownerId: userId, contactId: contactId },
		});
	}
}
