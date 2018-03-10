"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
class EntityController {
    constructor() {
        this.entityService = new services_1.EntityService();
    }
}
exports.EntityController = EntityController;
