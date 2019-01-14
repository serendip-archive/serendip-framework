"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const events_1 = require("events");
const url = require("url");
const chalk_1 = require("chalk");
const qs = require("qs");
class WebSocketService {
    constructor() {
        this.connectionEmitter = new events_1.EventEmitter();
        this.messageEmitter = new events_1.EventEmitter();
        this.dbService = __1.Server.services["DbService"];
        this.authService = __1.Server.services["AuthService"];
    }
    /**
     *
     * @param userId
     * @param path
     * @param model
     *
     */
    async sendToUser(userId, path, model) {
        var tokens = await this.authService.findTokensByUserId(userId);
        tokens.map(token => {
            return new Promise((resolve, reject) => {
                __1.Server.wsServer.clients.forEach((client) => {
                    if (client.token)
                        if (client.token.access_token == token.access_token)
                            client.send(model, (err) => {
                                resolve({
                                    username: token.username,
                                    access_token: token.access_token,
                                    result: err || "success"
                                });
                            });
                });
            });
        });
    }
    async start() {
        this.connectionEmitter.on("connection", (ws, req) => {
            ws.on("message", async (msg) => {
                // Server.wsServer.clients.forEach((client: WebSocketInterface) => {
                //   console.log(client.path, client.token);
                // });
                if (!ws.token)
                    try {
                        ws.token = await this.authService.findTokenByAccessToken(msg.toString());
                        var parsedUrl = url.parse(req.url);
                        ws.path = parsedUrl.pathname;
                        ws.query = qs.parse(parsedUrl.query);
                        console.log(chalk_1.default.blue(`\n${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | ` +
                            `new socket at ${req.url} user:${ws.token.username} ip:${req.connection.remoteAddress}\n`));
                        ws.send("authenticated");
                    }
                    catch (error) {
                        ws.terminate();
                        console.log(chalk_1.default.redBright(`\n${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | ` +
                            `unauthenticated socket closed ip:${req.connection.remoteAddress}\n`));
                    }
                else
                    this.messageEmitter.emit(req.url, msg, ws);
            });
            ws.on("close", (code, reason) => {
                console.log(chalk_1.default.redBright(`\n${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | ` +
                    `socket close user:${ws.token ? ws.token.username : "N/A"} code:${code} reason:${reason} \n`));
            });
        });
    }
}
WebSocketService.dependencies = ["DbService", "AuthService"];
exports.WebSocketService = WebSocketService;
