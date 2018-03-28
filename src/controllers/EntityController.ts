import { EntityService, DbService } from '../services';
import { UserModel, EntityModel } from '../models';
import { Collection, ObjectID } from 'mongodb';


export class EntityController {

    private entityService: EntityService;

    constructor() {

        this.entityService = new EntityService();

    }


    // public test: ControllerEndpoint = {
    //     method: 'get',
    //     customRoute: '/test',
    //     actions: [
    //         (req, res, next, done) => {
    //             new DbService<EntityModel>(DbCollectionNames.Entities).updateOne({
    //                 "_id": "5aa07851f7742d3dd4b8de13",
    //                 "modelName": "2222"
    //             }).then((doc) => {

    //                 res.json(doc);
    //                 done();

    //             }).catch(err => {

    //                 res.json(err);

    //             });
    //         }
    //     ]
    // };









}