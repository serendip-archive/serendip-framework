"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *  @module WebSocket
 */
const chalk_1 = require("chalk");
const events_1 = require("events");
const reqIp = require("request-ip");
const serendip_utility_1 = require("serendip-utility");
const __1 = require("..");
class WebSocketService {
    constructor(authService) {
        this.authService = authService;
        this.connectionEmitter = new events_1.EventEmitter();
        this.messageEmitter = new events_1.EventEmitter();
    }
    get httpService() {
        return __1.Server.services["HttpService"];
    }
    /**
     *
     * @param userId
     * @param path
     * @param model
     *
     */
    sendToUser(userId, path, model) {
        return __awaiter(this, void 0, void 0, function* () {
            this.httpService.wsServer.clients.forEach((client) => {
                if (client.token && client.token.userId != userId)
                    return;
                if (path)
                    if (client.path != path)
                        return;
                client.send(model, (err) => { });
            });
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.connectionEmitter.on("connection", (ws, req) => {
                ws.on("message", (msg) => __awaiter(this, void 0, void 0, function* () {
                    // Server.wsServer.clients.forEach((client: WebSocketInterface) => {
                    //   console.log(client.path, client.token);
                    // });
                    ws.path = req.url.split('?')[0];
                    ws.query = serendip_utility_1.querystring.toObject(req.url.split('#')[0]);
                    if (!ws.token &&
                        WebSocketService.bypassTokenOnRoutes.indexOf(ws.path) === -1)
                        try {
                            ws.token = yield this.authService.findTokenByAccessToken(msg.toString());
                            console.log(chalk_1.default.blue(`\n${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | ` +
                                `new socket at ${req.url} user:${ws.token.username} ip:${reqIp.getClientIp(req)}\n`));
                            ws.send("authenticated");
                        }
                        catch (error) {
                            ws.terminate();
                            console.log(chalk_1.default.redBright(`\n${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | ` +
                                `unauthenticated socket closed ip:${req.connection.remoteAddress}\n`));
                        }
                    else {
                        this.messageEmitter.emit(ws.path, msg, ws);
                        console.log('emitted', ws.path, ws.token ? 'has token' : '', msg);
                    }
                }));
                ws.on("close", (code, reason) => {
                    console.log(chalk_1.default.redBright(`\n${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | ` +
                        `socket close user:${ws.token ? ws.token.username : "N/A"} code:${code} reason:${reason} \n`));
                });
            });
        });
    }
}
// set routes you want to bypass default token negotiation
WebSocketService.bypassTokenOnRoutes = [];
exports.WebSocketService = WebSocketService;
