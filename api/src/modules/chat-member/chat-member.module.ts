import { Module } from '@nestjs/common';
import { ChatMemberService } from './chat-member.service';
import { ChatMemberController } from './chat-member.controller';
import { ChatMemberRepository } from './chat-member.repository';

@Module({
  controllers: [ChatMemberController],
  providers: [ChatMemberService, ChatMemberRepository],
  exports: [ChatMemberRepository],
})
export class ChatMemberModule {}
