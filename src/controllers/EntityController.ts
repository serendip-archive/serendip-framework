import { Server, ServerRequest, ServerResponse } from '../Server'
import { EntityService } from '../services';
import { UserModel, EntityModel } from '../models';
import { Collection, ObjectID } from 'mongodb';


export class EntityController {

    private entityService: EntityService;

    constructor() {

        this.entityService = new EntityService();

    }


    









}