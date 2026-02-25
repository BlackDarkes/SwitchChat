import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { ChatsService } from "./chats.service";
import { ChatRepository } from "./chat.repository";
import { Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IPayload } from "@/modules/auth/types/payload.interface";
import { TypeUpdateMessageSchema } from "../messages/common/dto/update-message.dto";

@WebSocketGateway({
	namespace: "chats",
	cors: { origin: "*" },
})
export class ChatsGateway {
	@WebSocketServer() server: Server;

	constructor(
		private readonly chatsService: ChatsService,
		private readonly chatRepository: ChatRepository,
		private readonly jwtService: JwtService,
	) {}

	async handleConnection(client: Socket) {
		try {
			const token =
				client.handshake.auth.token ||
				client.handshake.headers.authorization?.split(" ")[1];
			if (!token) throw new UnauthorizedException();

			const payload: IPayload = await this.jwtService.verifyAsync(token);
			client.data.userId = payload.id;

			const userChats = await this.chatRepository.getAllByUserId(payload.id);
			userChats?.forEach((chat) => {
				client.join(chat.id);
			});

			console.log(
				`User ${payload.id} connected and joined ${userChats?.length} rooms`,
			);
		} catch {
			client.disconnect();
		}
	}

	handleDisconnect(client: Socket) {
		console.log(`Client ${client.id} disconnected`);
	}

	@SubscribeMessage("join_room")
	handleJoinRoom(
		@MessageBody() chatId: string,
		@ConnectedSocket() client: Socket,
	) {
		client.join(chatId);

		console.log(`Client ${client.id} joined room ${chatId}`);

		return {
			status: "ok",
			joined: chatId,
			message: "Joined room successfully",
		};
	}

	@SubscribeMessage("leave_room")
	handleLeaveRoom(
		@MessageBody() chatId: string,
		@ConnectedSocket() client: Socket,
	) {
		client.leave(chatId);

		// Logger.log(`Client ${client.id} left room ${chatId}`);

    console.log(`Client ${client.id} left room ${chatId}`);

		return {
			status: "ok",
			left: chatId,
			message: "Left room successfully",
		};
	}

  emitNewMessage(chatId: string, message: any) {
    this.server.to(chatId).emit("message_received", message);
  }

	emitMessageUpdated(chatId: string, message: any) {
		this.server.to(chatId).emit("message_updated", message);
	}

	emitMessageDeleted(chatId: string, messageId: string) {
		this.server.to(chatId).emit("message_deleted", { messageId });
	}

	emitReactionUpdate(chatId: string, data: { messageId: string, emoji: string }) {
		this.server.to(chatId).emit("reaction_updated", data);
	}

  @SubscribeMessage("typing")
  handleTyping(
    @MessageBody() data: { chatId: string, isTyping: boolean },
    @ConnectedSocket() client: Socket,
  ) {
    client.to(data.chatId).emit("user_typing", {
      userId: client.data.userId,
      isTyping: data.isTyping
    })
  }

	@SubscribeMessage("joinChat")
	async handleJoinChat(client: Socket, data: { clientId: string }) {
		client.join(data.clientId);
		console.log(`Client ${data.clientId} joined chat`);

		const chats = await this.chatRepository.getAll();

		return { status: "ok", joined: data.clientId, chats };
	}
}
