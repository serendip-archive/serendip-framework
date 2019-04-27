/**
 *  @module WebSocket
 */

 import {
  ServerServiceInterface,
  EmailService,
  Server,
  EmailModel,
  SmsIrService,
  DbService,
  AuthService
} from "..";

import * as WS from "ws";
import { EventEmitter } from "events";
import { IncomingMessage } from "http";
import { WebSocketInterface } from "./WebSocketInterface";
import * as url from "url";
import chalk from "chalk";
import * as qs from "qs";
import * as reqIp from "request-ip";
import { HttpService } from "../http";

export class WebSocketService implements ServerServiceInterface {
  connectionEmitter = new EventEmitter();
  messageEmitter = new EventEmitter();

  // set routes you want to bypass default token negotiation
  static bypassTokenOnRoutes: string[] = [];

  get httpService(): HttpService {
    return Server.services["HttpService"] as HttpService;
  }
  constructor(private authService: AuthService) {}

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
      client.send(model, (err?) => {});
    });
  }

  async start() {
    this.connectionEmitter.on(
      "connection",
      (ws: WebSocketInterface, req: IncomingMessage) => {
        ws.on("message", async msg => {
          // Server.wsServer.clients.forEach((client: WebSocketInterface) => {
          //   console.log(client.path, client.token);
          // });

          var parsedUrl = url.parse(req.url);
          ws.path = parsedUrl.pathname;

          ws.query = qs.parse(parsedUrl.query);

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
          else this.messageEmitter.emit(ws.path, msg, ws);
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
