"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
class EntityController {
    constructor() {
        this.entityService = new services_1.EntityService();
    }
    getCreate(req, res) {
        var model = { modelName: req.query.modelName };
        this.entityService.createEntity(model).then(function (doc) {
            res.json(doc);
        });
    }
}
exports.EntityController = EntityController;
