import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatsGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage("joinChat")
  handleJoinChat(client: Socket, clientId: string) {
    client.join(clientId);
    console.log(`Client ${clientId} joined chat`);
  }
}

