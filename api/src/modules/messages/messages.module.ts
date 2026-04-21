import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { ChatsModule } from '../chats/chats.module';
import { PrismaModule } from '../prisma/prisma.module';
import { MessagesRepository } from './messages.repository';
import { ChatMemberModule } from '../chat-member/chat-member.module';
import { ReactionModule } from '../reaction/reaction.module';

@Module({
  imports: [
    ChatsModule,
    PrismaModule,
    ChatMemberModule,
    ReactionModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {}
