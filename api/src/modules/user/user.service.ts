import { BadRequestException, Injectable } from "@nestjs/common";
import { Prisma } from "@/app/generated/prisma/client";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async getAll() {
		return this.userRepository.getAll();
	}

	async getById(id: string) {
		if (!id) {
			throw new BadRequestException("Пользователь с таким id не найден");
		}

		return this.userRepository.getById(id);
	}

	async getByEmail(email: string) {
		if (!email) {
			throw new BadRequestException("Пользователь с такой почтой не найден");
		}

		return this.userRepository.getByEmail(email);
	}

	async getByUsername(username: string) {
		if (!username) {
			throw new BadRequestException("Пользователь с таким username не найден");
		}

		return this.userRepository.getByUsername(username);
	}

	async searchUser(userId: string, search: string) {
    if (!search.trim()) return [];

		return this.userRepository.searchUser(userId, search);
	}

	async create(data: Prisma.UserCreateInput) {
		return this.userRepository.create(data);
	}

	async update(id: string, data: Prisma.UserUpdateInput) {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new BadRequestException("Пользователь с таким id не найден");
    }

		return this.userRepository.update(id, data);
	}

	async updateUsername(id: string, username: string) {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new BadRequestException("Пользователь с таким id не найден");
    }

		return this.userRepository.updateUsername(id, username);
	}

	async remove(id: string) {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new BadRequestException("Пользователь с таким id не найден");
    }

		return this.userRepository.remove(id);
	}
}
