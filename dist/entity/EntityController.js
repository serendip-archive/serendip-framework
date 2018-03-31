"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityService_1 = require("./EntityService");
class EntityController {
    constructor() {
        this.entityService = new EntityService_1.EntityService();
    }
}
exports.EntityController = EntityController;
