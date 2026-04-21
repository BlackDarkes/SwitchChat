import { BadRequestException, Injectable } from "@nestjs/common";
import { ChatMemberRepository } from "./chat-member.repository";
import { EnumRoleMember } from "@/app/generated/prisma/enums";

@Injectable()
export class ChatMemberService {
	constructor(private readonly chatMemberRepository: ChatMemberRepository) {}

	async updateMemberRole(chatId: string, userId: string, role: EnumRoleMember) {
		return this.chatMemberRepository.updateRole(chatId, userId, role);
	}

	async updateLastSeenMessage(
		chatId: string,
		userId: string,
		messageId: string,
	) {
		return this.chatMemberRepository.updateLastSeenMessage(chatId, userId, messageId);
	}

    async kikMember(chatId: string, userId: string, adminId: string) {
      const admin = await this.chatMemberRepository.getChatMember(chatId, adminId);
  
      if (!admin || admin.role !== "OWNER") {
        throw new BadRequestException("У вас недостаточно прав");
      }
  
      return this.chatMemberRepository.delete(chatId, userId);
    }
}
