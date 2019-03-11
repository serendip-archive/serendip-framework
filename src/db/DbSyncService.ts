import { DbService } from "./DbService";
import { WebSocketService } from "../ws";
import * as WS from "ws";
import { EntityModel } from "serendip-business-model";

export class DbSyncService {
  route = "/db_sync";
  constructor(
    private dbService: DbService,
    private webSocketService: WebSocketService
  ) {
    if (WebSocketService.bypassTokenOnRoutes.indexOf(this.route) == -1) {
      WebSocketService.bypassTokenOnRoutes.push(this.route);
    }
  }

  async start() {
    const changesEvent = this.dbService.collectionEvents()["EntityChanges"];

    changesEvent.on("update", (model: EntityModel) => {
      console.log("DbSyncService", "update", model);
    });
    changesEvent.on("insert", (model: EntityModel) => {
      console.log("DbSyncService", "insert", model);
    });
    changesEvent.on("delete", (model: EntityModel) => {
      console.log("DbSyncService", "delete", model);
    });

    this.webSocketService.messageEmitter.on(
      this.route,
      (msg: WS.Data, ws: WS) => {}
    );
  }
}
