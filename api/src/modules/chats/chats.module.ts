import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { ChatsGateway } from './chats.gateway';
import { ChatRepository } from './chat.repository';

@Module({
  controllers: [ChatsController],
  providers: [ChatsService, ChatRepository, ChatsGateway],
})
export class ChatsModule {}
