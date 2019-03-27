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
const ws_1 = require("../ws");
class DbSyncService {
    constructor(dbService, webSocketService) {
        this.dbService = dbService;
        this.webSocketService = webSocketService;
        this.route = "/db_sync";
        if (ws_1.WebSocketService.bypassTokenOnRoutes.indexOf(this.route) == -1) {
            ws_1.WebSocketService.bypassTokenOnRoutes.push(this.route);
        }
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const changesEvent = this.dbService.events()["EntityChanges"];
            changesEvent.on("update", (model) => {
                console.log("DbSyncService", "update", model);
            });
            changesEvent.on("insert", (model) => {
                console.log("DbSyncService", "insert", model);
            });
            changesEvent.on("delete", (model) => {
                console.log("DbSyncService", "delete", model);
            });
            this.webSocketService.messageEmitter.on(this.route, (msg, ws) => { });
        });
    }
}
exports.DbSyncService = DbSyncService;
