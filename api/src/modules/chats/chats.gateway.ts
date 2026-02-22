import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { Socket } from 'socket.io';
import { ChatsService } from './chats.service';
import { ChatRepository } from './chat.repository';

@WebSocketGateway({ 
  namespace: "chats",
  cors: { origin: "*" }
})
export class ChatsGateway {
  @WebSocketServer() server: Server;

  constructor(
    private readonly chatsService: ChatsService,
    private readonly chatRepository: ChatRepository
  ) {}

  @SubscribeMessage("joinChat")
  async handleJoinChat(client: Socket, data: { clientId: string }) {
    client.join(data.clientId);
    console.log(`Client ${data.clientId} joined chat`);

    const chats = await this.chatRepository.getAll();

    return { status: 'ok', joined: data.clientId, chats };
  }
}

