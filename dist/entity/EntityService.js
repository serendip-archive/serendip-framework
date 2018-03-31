"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EntityService {
    // private entityDb: DbService<EntityModel>;
    // private entityCacheDb: DbService<EntityCacheModel>;
    // private entityChangeDb: DbService<EntityChangeModel>;
    constructor() {
        // this.entityDb = new DbService<EntityModel>(DbCollectionNames.Entities);
        // this.entityCacheDb = new DbService<EntityCacheModel>(DbCollectionNames.EntityCache);
        // this.entityChangeDb = new DbService<EntityChangeModel>(DbCollectionNames.EntityChanges);
    }
    async start() {
    }
}
EntityService.dependencies = ['DbService', 'AuthService'];
exports.EntityService = EntityService;
