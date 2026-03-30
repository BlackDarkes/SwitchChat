import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Contact } from "@/app/generated/prisma/client";
import { QueryMode } from "@/app/generated/prisma/internal/prismaNamespace";

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

	async searchContact(userId: string, search: string): Promise<Contact[] | []> {
		if (!search.trim()) return [];

		const contacts = await this.prismaService.client.contact.findMany({
			where: {
				ownerId: userId,
				contactId: { not: userId },
				contact: {
					OR: [
						{
							name: {
								contains: search.trim(),
								mode: QueryMode.insensitive,
							},
						},
						{
							username: {
								contains: search.trim(),
								mode: QueryMode.insensitive,
							},
						},
					],
				},
			},
			take: 20,
			include: {
				owner: {
					include: { chatMembers: { where: { chat: { type: "DIRECT" } } } },
				},
				contact: {
					include: { chatMembers: { where: { chat: { type: "DIRECT" } } } },
				},
			},
		});

		return contacts;
	}
}
