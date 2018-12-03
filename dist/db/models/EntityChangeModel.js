"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var entityChangeType;
(function (entityChangeType) {
    entityChangeType[entityChangeType["Delete"] = 0] = "Delete";
    entityChangeType[entityChangeType["Create"] = 1] = "Create";
    entityChangeType[entityChangeType["Update"] = 2] = "Update";
})(entityChangeType = exports.entityChangeType || (exports.entityChangeType = {}));
class EntityChangeModel {
    constructor(model) {
        if (model._id)
            this._id = model._id;
        this.date = model.date;
        this.type = model.type;
        this.model = model.model;
        this.diff = model.diff;
        this.userId = model.userId;
        this.collection = model.collection;
        this.entityId = model.entityId;
    }
}
exports.EntityChangeModel = EntityChangeModel;
