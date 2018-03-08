import { Server, ServerRequest, ServerResponse } from '../Server'
import { EntityService } from '../services';
import { UserModel, EntityModel } from '../models';
import { Collection, ObjectID } from 'mongodb';


export class EntityRoute {

    private entityService: EntityService;

    constructor() {

        this.entityService = new EntityService();

    }


    public getCreate(req: ServerRequest, res: ServerResponse) {

        var model : EntityModel = { modelName: req.query.modelName };

        this.entityService.createEntity(model).then(function (doc) {


            res.json(doc);

        });


    }









}