import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';

export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  afterInit(server: any): any {
    console.log('init');
  }

  handleConnection(client: any, ...args: any[]): any {
    console.log('connection');
  }

  handleDisconnect(client: any): any {
    console.log('disconnect');
  }
}
