import { EntityModel, EntityChangeModel, EntityCacheModel } from "../models";
import { ServiceInterface } from ".";

export class EntityService implements ServiceInterface {

    static dependencies = ['DbService','AuthService'];

    async start() {


    }
    // private entityDb: DbService<EntityModel>;

    // private entityCacheDb: DbService<EntityCacheModel>;

    // private entityChangeDb: DbService<EntityChangeModel>;


    constructor() {

        // this.entityDb = new DbService<EntityModel>(DbCollectionNames.Entities);

        // this.entityCacheDb = new DbService<EntityCacheModel>(DbCollectionNames.EntityCache);

        // this.entityChangeDb = new DbService<EntityChangeModel>(DbCollectionNames.EntityChanges);

    }

    /**
     * create entity and return it as promise
     * @param model EntityModel
     */
    // public createEntity(model: EntityModel): Promise<EntityModel> {

    //     return this.entityDb.insertOne(model);

    // }

    // public createEntityChange(model: EntityChangeModel): Promise<EntityChangeModel> {

    //     return this.entityChangeDb.insertOne(model);

    // }


}