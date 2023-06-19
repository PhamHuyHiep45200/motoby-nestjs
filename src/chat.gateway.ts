import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  connectedUsers: string[] = [];

  handleConnection(socket: Socket) {
    console.log('connect', socket.id);
    // Xử lý sự kiện khi có người dùng kết nối
    this.connectedUsers.push(socket.id);
    this.server.emit('users', this.connectedUsers.length);
  }

  handleDisconnect(socket: Socket) {
    console.log('disconnect', socket.id);
    // Xử lý sự kiện khi có người dùng ngắt kết nối
    this.connectedUsers = this.connectedUsers.filter((id) => id !== socket.id);
    this.server.emit('users', this.connectedUsers.length);
  }

  @SubscribeMessage('chat')
  handleMessage(socket: Socket, message: string) {
    // Xử lý tin nhắn chat
    this.server.on('sendchat', (message) => {
      this.server.emit('chat', message);
    });
  }
}
