import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { QueryMode } from "@/app/generated/prisma/internal/prismaNamespace";
import { User } from "@/app/generated/prisma/client";

@Injectable()
export class UserRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async getAll() {
		return this.prismaService.client.user.findMany();
	}

	async getById(id: string) {
		if (!id) {
			throw new BadRequestException("Пользователь с таким id не найден");
		}

		return this.prismaService.client.user.findUnique({ where: { id } });
	}

	async getByEmail(email: string) {
		return this.prismaService.client.user.findUnique({ where: { email } });
	}

	async getByUsername(username: string) {
		return this.prismaService.client.user.findUnique({ where: { username } });
	}

	async searchUser(userId: string, search: string): Promise<User[] | []> {
		if (!search.trim()) return [];

		const users = await this.prismaService.client.user.findMany({
			where: {
				AND: [
					{
						OR: [
							{
								name: { contains: search.trim(), mode: QueryMode.insensitive },
							},
							{
								username: {
									contains: search.trim(),
									mode: QueryMode.insensitive,
								},
							},
						],
					},
					{ NOT: { id: userId } },
				],
			},
			take: 20,
		});

		return users;
	}
}
