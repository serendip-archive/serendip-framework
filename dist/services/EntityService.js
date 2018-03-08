"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class EntityService {
    constructor() {
        this.entityDb = new _1.DbService(_1.DbCollectionNames.Entities);
        this.entityCacheDb = new _1.DbService(_1.DbCollectionNames.EntityCache);
        this.entityChangeDb = new _1.DbService(_1.DbCollectionNames.EntityChanges);
    }
    /**
     * create entity and return it as promise
     * @param model EntityModel
     */
    createEntity(model) {
        return this.entityDb.insertOne(model);
    }
    createEntityChange(model) {
        return this.entityChangeDb.insertOne(model);
    }
}
exports.EntityService = EntityService;
