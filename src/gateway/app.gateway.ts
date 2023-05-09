import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import prisma from '../main';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, movieId: string) {
    const timesOpenedJSON = await prisma.movieTimesOpened.findUnique({
      where: { movieId: Number(movieId) },
      select: { timeOpened: true },
    });
    const timesOpened = timesOpenedJSON.timeOpened + 1;

    await prisma.movieTimesOpened.update({
      where: { movieId: Number(movieId) },
      data: { timeOpened: timesOpened },
    });

    this.server.emit('msgToClient', movieId + ' ' + timesOpened);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
