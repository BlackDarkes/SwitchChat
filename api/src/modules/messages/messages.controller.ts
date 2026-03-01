import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';
import { CurrentUser } from '@/app/common/decorators/current-user.decorator';
import { TypeCreateMessageSchema } from './common/dto/create-message.dto';
import { TypeUpdateMessageSchema } from './common/dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly messagesRepository: MessagesRepository,
  ) {}

  @Get(":id")
  @HttpCode(200)
  async getHistory(
    @Param("id") chatId: string,
    @Query("limit") limit: number,
    @Query("cursor") cursor?: string,
  ) {
    return this.messagesRepository.getChatMessage(chatId, +limit || 50, cursor);
  }

  @Post(":id")
  @HttpCode(201)
  async send(
    @Param("id") chatId: string,
    @CurrentUser("id") userId: string,
    @Body() data: TypeCreateMessageSchema
  ) {
    return this.messagesService.sendMessage(userId, chatId, data);
  }

  @Patch(":id")
  async update(
    @Param("id") messageId: string,
    @CurrentUser("id") userId: string,
    @Body() data: TypeUpdateMessageSchema
  ) {
    return this.messagesService.editMessage(userId, messageId, data);
  }

  @Delete(":id")
  @HttpCode(200)
  async delete(
    @Param("id") messageId: string,
    @CurrentUser("id") userId: string,
  ) {
    await this.messagesService.deleteMessage(userId, messageId);

    return { message: "Сообщение удалено" };
  }

  @Post(":id/react/:emoji")
  @HttpCode(201)
  async react(
    @Param("id") messageId: string,
    @Param("emoji") emoji: string,
    @CurrentUser("id") userId: string,
  ) {
    return this.messagesService.addReaction(userId, messageId, emoji);
  }

  @Post(":chatId/read/:messageId")
  @HttpCode(201)
  async readMessage(
    @Param("chatId") chatId: string,
    @Param("messageId") messageId: string,
    @CurrentUser("id") userId: string,
  ) {
    return this.messagesService.readMessage(userId, chatId, messageId);
  }
}
