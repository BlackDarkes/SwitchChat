import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service"; 
import { type TypeCreateChatSchema } from "./common/dto/create-chat.dto";
import {  v4 as uuid } from "uuid";

@Injectable()
export class ChatsService {
	constructor(private readonly prismaService: PrismaService) {}

  async create(data: TypeCreateChatSchema) {
    const { name, type, ownerId } = data;
    const id = uuid();
    const username = this.createUsername(id);

    return this.prismaService.client.chat.create({ data: { name, username, type, ownerId } })
  }

  private createUsername(id: string) {
    return `chat_${id.split("-")[0]}`;
  }
}
