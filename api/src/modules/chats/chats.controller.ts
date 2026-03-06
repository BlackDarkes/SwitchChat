import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatRepository } from './chat.repository';
import { TypeCreateChatSchema } from './common/dto/create-chat.dto';
import { CurrentUser } from '@/app/common/decorators/current-user.decorator';
import { EnumRoleMember } from '@/app/generated/prisma/enums';
import { JwtGuard } from '../auth/common/guard/jwt.guard';

@Controller('chats')
@UseGuards(JwtGuard)
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly chatRepository: ChatRepository,
  ) {}

  @Get("all")
  @HttpCode(200)
  async getAll() {
    const chats = await this.chatRepository.getAll();

    return {
      chats,
    }
  }

  @Get("")
  @HttpCode(200)
  async getAllByUserId(
    @CurrentUser("id") userId: string
  ) {
    const chats = await this.chatRepository.getAllByUserId(userId);

    return {
      chats,
    }
  }

  @Get(":id")
  @HttpCode(200)
  async getChatInfo(
    @Param("id") chatId: string,
  ) {
    return this.chatRepository.getChatWithFullInfo(chatId);
  }

  @Post("")
  @HttpCode(201)
  async create(
    @Body() data: TypeCreateChatSchema,
    @CurrentUser("id") userId: string,
  ) {
    const chat = await this.chatsService.create({ ...data, ownerId: userId });

    return {
      message: "Чат успешно создан",
      chat
    }
  }

  @Post(":id/join")
  @HttpCode(201)
  async join(
    @Param("id") id: string,
    @CurrentUser("id") userId: string, 
  ) {
    return this.chatsService.joinChat(id, userId);
  }

  @Delete(":id/leave")
  @HttpCode(200)
  async leave(
    @Param("id") chatId: string,
    @CurrentUser("id") userId: string
  ) {
    return this.chatsService.leaveChat(chatId, userId);
  }

  // Добавить @role("admin")
  @Delete(":id/kik/:targetUserId")
  @HttpCode(200)
  async kik(
    @Param("id") chatId: string,
    @Param("targetUserId") userId: string,
    @CurrentUser("id") adminId: string
  ) {
    return this.chatsService.kikMember(chatId, userId, adminId);
  }

  @Patch(":id/member/:targetUserId/role")
  @HttpCode(200)
  async updateRole(
    @Param("id") chatId: string,
    @Param("targetUserId") userId: string,
    @Body("role") role: EnumRoleMember,
  ) {
    return this.chatsService.updateMemberRole(chatId, userId, role);
  }
}
