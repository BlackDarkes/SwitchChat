import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@/app/generated/prisma/client";

@Injectable()
export class ReactionRepository {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async getAll() {
    return this.prismaService.client.reaction.findMany();
  }

  async getReactionsByMessageId(messageId: string) {
    return this.prismaService.client.reaction.findMany({ where: { messageId } });
  }

  async getReactionsByUserId(userId: string) {
    return this.prismaService.client.reaction.findMany({ where: { userId } });
  }

  async getReactionById(id: string) {
    return this.prismaService.client.reaction.findUnique({ where: { id } });
  }

  async getReaction(userId: string, messageId: string, emoji: string) {
    return this.prismaService.client.reaction.findFirst({
      where: { messageId, userId, emoji },
    });
  }

  async create(data: Prisma.ReactionCreateInput) {
    return this.prismaService.client.reaction.create({ data });
  }

  async delete(id: string) {
    return this.prismaService.client.reaction.delete({ where: { id } });
  }
}