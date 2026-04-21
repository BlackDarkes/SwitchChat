import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { ChatsService } from "./chats.service";
import { ChatsRepository } from "./chats.repository";
import { JwtService } from "@nestjs/jwt";
import { parse } from "cookie";
import { BadGatewayException } from "@nestjs/common";

@WebSocketGateway({
	namespace: "chats",
	cors: {
		origin: "*",
		credentials: true,
	},
})
export class ChatsGateway {
	@WebSocketServer() server: Server = new Server();

	constructor(
		private readonly chatsService: ChatsService,
		private readonly chatRepository: ChatsRepository,
		private readonly jwtService: JwtService,
	) {}

	async handleConnection(client: Socket) {
		try {
			const cookies = parse(client.handshake.headers.cookie || "");
			const token = cookies.access_token;

			if (!token) throw new BadGatewayException("No token");

			const payload = await this.jwtService.verifyAsync(token, {
				secret: process.env.JWT_SECRET,
			});

			client.data.userId = payload.id;
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

	emitReactionUpdate(
		chatId: string,
		data: { messageId: string; emoji: string },
	) {
		this.server.to(chatId).emit("reaction_updated", data);
	}

	@SubscribeMessage("typing")
	handleTyping(
		@MessageBody() data: { chatId: string; isTyping: boolean },
		@ConnectedSocket() client: Socket,
	) {
		client.to(data.chatId).emit("user_typing", {
			userId: client.data.userId,
			isTyping: data.isTyping,
		});
	}

	@SubscribeMessage("joinChat")
	async handleJoinChat(client: Socket, data: { clientId: string }) {
		client.join(data.clientId);
		console.log(`Client ${data.clientId} joined chat`);

		const chats = await this.chatRepository.getAll();

		return { status: "ok", joined: data.clientId, chats };
	}
}
