import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';
import { ReactionRepository } from './reaction.repository';
import { ChatsModule } from '../chats/chats.module';

@Module({
  imports: [ChatsModule],
  controllers: [ReactionController],
  providers: [ReactionService, ReactionRepository],
  exports: [ReactionService, ReactionRepository],
})
export class ReactionModule {}
