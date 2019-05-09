/**
 *  @module WebSocket
 */
import chalk from 'chalk';
import { EventEmitter } from 'events';
import { IncomingMessage } from 'http';
import * as reqIp from 'request-ip';
import { querystring as qs } from 'serendip-utility';
import * as url from 'url';

import { AuthService, Server, ServerServiceInterface } from '..';
import { HttpService } from '../http';
import { WebSocketInterface } from './WebSocketInterface';


export class WebSocketService implements ServerServiceInterface {
  connectionEmitter = new EventEmitter();
  messageEmitter = new EventEmitter();

  // set routes you want to bypass default token negotiation
  static bypassTokenOnRoutes: string[] = [];

  get httpService(): HttpService {
    return Server.services["HttpService"] as HttpService;
  }
  constructor(private authService: AuthService) { }

  /**
   *
   * @param userId
   * @param path
   * @param model
   *
   */
  async sendToUser(userId: string, path: string, model: string) {
    this.httpService.wsServer.clients.forEach((client: WebSocketInterface) => {
      if (client.token && client.token.userId != userId) return;

      if (path) if (client.path != path) return;
      client.send(model, (err?) => { });
    });
  }

  async start() {
    this.connectionEmitter.on(
      "connection",
      (ws: WebSocketInterface, req: IncomingMessage) => {
        ws.on("message", async msg => {
          ws.path = req.url.split('?')[0];

          ws.query = qs.toObject(req.url.split('#')[0]);

          if (
            !ws.token &&
            WebSocketService.bypassTokenOnRoutes.indexOf(ws.path) === -1
          )
            try {
              ws.token = await this.authService.findTokenByAccessToken(
                msg.toString()
              );

              console.log(
                chalk.blue(
                  `\n${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | ` +
                  `new socket at ${req.url} user:${
                  ws.token.username
                  } ip:${reqIp.getClientIp(req)}\n`
                )
              );

              ws.send("authenticated");
            } catch (error) {
              ws.terminate();

              console.log(
                chalk.redBright(
                  `\n${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | ` +
                  `unauthenticated socket closed ip:${
                  req.connection.remoteAddress
                  }\n`
                )
              );
            }
          else 
          {
            this.messageEmitter.emit(ws.path, msg, ws);
            console.log('emitted', ws.path, ws.token ? 'has token' : '', msg);

          }
        });

        ws.on("close", (code, reason) => {
          console.log(
            chalk.redBright(
              `\n${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | ` +
              `socket close user:${
              ws.token ? ws.token.username : "N/A"
              } code:${code} reason:${reason} \n`
            )
          );
        });
      }
    );
  }
}
