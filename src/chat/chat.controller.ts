import { Controller } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@Controller('chat')
export class ChatController {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log(client.id)
    // Xử lý khi một client kết nối đến
  }

  handleDisconnect(client: any) {
    // Xử lý khi một client ngắt kết nối
  }

  @SubscribeMessage('send-chat')
  handleEvent(client: any, data: any) {
    console.log(data);
    this.server.emit('chat', data);
  }
}
