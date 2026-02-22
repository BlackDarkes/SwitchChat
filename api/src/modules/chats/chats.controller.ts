import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatRepository } from './chat.repository';
import { TypeCreateChatSchema } from './common/dto/create-chat.dto';

@Controller('chats')
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly chatRepository: ChatRepository,
  ) {}

  @Get("")
  @HttpCode(200)
  async getAll() {
    const chats = await this.chatRepository.getAll();

    return {
      chats,
    }
  }

  @Get("/user/:userId")
  @HttpCode(200)
  async getAllByUserId(
    @Param("userId") userId: string
  ) {
    const chats = await this.chatRepository.getAllByUserId(userId);

    return {
      chats,
    }
  }

  @Post("")
  @HttpCode(201)
  async create(
    @Body() data: TypeCreateChatSchema,
  ) {
    const chat = await this.chatsService.create(data);

    return {
      message: "Чат успешно создан",
      chat
    }
  }
}
