import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ContactsRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async getUserContacts(userId: string) {
		return this.prismaService.client.contact.findMany({
			where: { OR: [{ ownerId: userId }, { contactId: userId }] },
			include: {
				owner: {
					include: { chatMembers: { where: { chat: { type: "DIRECT" } } } },
				},
				contact: {
					include: { chatMembers: { where: { chat: { type: "DIRECT" } } } },
				},
			},
		});
	}
}
