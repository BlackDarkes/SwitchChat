import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { ChatsModule } from '../chats/chats.module';
import { PrismaModule } from '../prisma/prisma.module';
import { MessagesRepository } from './messages.repository';

@Module({
  imports: [
    ChatsModule,
    PrismaModule
  ],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {}
