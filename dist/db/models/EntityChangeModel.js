"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EntityChangeType;
(function (EntityChangeType) {
    EntityChangeType[EntityChangeType["Delete"] = 0] = "Delete";
    EntityChangeType[EntityChangeType["Create"] = 1] = "Create";
    EntityChangeType[EntityChangeType["Update"] = 2] = "Update";
})(EntityChangeType = exports.EntityChangeType || (exports.EntityChangeType = {}));
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
