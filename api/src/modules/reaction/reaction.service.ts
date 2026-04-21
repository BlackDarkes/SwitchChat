import { Injectable } from '@nestjs/common';
import { ReactionRepository } from './reaction.repository';
import { ChatsGateway } from '../chats/chats.gateway';

@Injectable()
export class ReactionService {
  constructor(
    private readonly reactionRepository: ReactionRepository,
    private readonly chatsGateway: ChatsGateway,
  ) {}

  async addReaction(userId: string, messageId: string, emoji: string) {
		const reaction = await this.reactionRepository.getReaction(userId, messageId, emoji);

		if (reaction) {
			return this.reactionRepository.delete(reaction.id);
		}

		const createdReaction = await this.reactionRepository.create({
			message: { connect: { id: messageId } },
			user: { connect: { id: userId } },
			emoji,
		});

		this.chatsGateway.emitReactionUpdate(messageId, createdReaction);

		return createdReaction;
	}
}
