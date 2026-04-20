import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { QueryMode } from "@/app/generated/prisma/internal/prismaNamespace";
import {
	ChatMember,
	Contact,
	Prisma,
	User,
} from "@/app/generated/prisma/client";

type ContactWithUsers = Contact & {
	owner: User & { chatMembers: ChatMember[] };
	contact: User & { chatMembers: ChatMember[] };
};

type ContactSearchResult =
	| ContactWithUsers
	| {
			id: null;
			ownerId: string;
			contactId: string;
			addedAt: null;
			owner: User & { chatMembers: ChatMember[] };
			contact: User & { chatMembers: ChatMember[] };
	  };

@Injectable()
export class UserRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async getAll() {
		return this.prismaService.client.user.findMany();
	}

	async getById(id: string) {
		return this.prismaService.client.user.findUnique({ where: { id } });
	}

	async getByEmail(email: string) {
		return this.prismaService.client.user.findUnique({ where: { email } });
	}

	async getByUsername(username: string) {
		return this.prismaService.client.user.findUnique({ where: { username } });
	}

	async searchUser(
		userId: string,
		search: string,
	): Promise<ContactSearchResult[]> {
		const users = await this.prismaService.client.user.findMany({
			where: {
				id: { not: userId },
				OR: [
					{ name: { contains: search.trim(), mode: QueryMode.insensitive } },
					{
						username: { contains: search.trim(), mode: QueryMode.insensitive },
					},
				],
			},
			take: 20,
		});

		if (users.length === 0) return [];

		const currentUser = await this.prismaService.client.user.findUnique({
			where: { id: userId },
			include: {
				chatMembers: { where: { chat: { type: "DIRECT" } } },
			},
		});

		if (!currentUser) return [];

		const userIds = users.map((u) => u.id);
		const existingContacts = await this.prismaService.client.contact.findMany({
			where: {
				ownerId: userId,
				contactId: { in: userIds },
			},
			include: {
				owner: {
					include: { chatMembers: { where: { chat: { type: "DIRECT" } } } },
				},
				contact: {
					include: { chatMembers: { where: { chat: { type: "DIRECT" } } } },
				},
			},
		});

		const contactMap = new Map(existingContacts.map((c) => [c.contactId, c]));

		return users.map((user) => {
			const existing = contactMap.get(user.id);

			if (existing) {
				return existing as ContactSearchResult;
			}

			return {
				id: null,
				ownerId: userId,
				contactId: user.id,
				addedAt: null,
				owner: currentUser,
				contact: {
					...user,
					chatMembers: [],
				},
			} as ContactSearchResult;
		});
	}

	async create(data: Prisma.UserCreateInput) {
		return this.prismaService.client.user.create({ data });
	}

	async update(id: string, data: Prisma.UserUpdateInput) {
		return this.prismaService.client.user.update({ where: { id }, data });
	}

	async updateUsername(id: string, username: string) {
		return this.prismaService.client.user.update({
			where: { id },
			data: { username },
		});
	}

	async remove(id: string) {
		return this.prismaService.client.user.delete({ where: { id } });
	}
}
