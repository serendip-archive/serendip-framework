import { Collection, IndexOptions, ObjectID } from "mongodb";
import * as deep from 'deep-diff';
import { DbService, entityChangeType } from ".";
import { Server } from "..";


export class DbCollection<T>{

    private _collection: Collection<T>;
    private _track = false;
    private _dbService: DbService;

    constructor(collection: Collection<T>, track: boolean) {

        this._collection = collection;

        this._track = track;

        this._dbService = Server.services["DbService"];

        if (this._collection.collectionName == "EntityChanges")
            this._track = false;



    }

    public async createIndex(fieldOrSpec: any, options: IndexOptions) {

        return this._collection.createIndex(fieldOrSpec, options);

    };

    public find(query): Promise<T[]> {


        return new Promise((resolve, reject) => {

            var doc = this._collection.find<T>(query).toArray((err, results) => {

                if (err)
                    return reject(err);

                return resolve(results);


            });

        });

    }

    public updateOne(model: T, userId?: string): Promise<void> {


        return new Promise((resolve, reject) => {

            model["_id"] = new ObjectID(model["_id"]);


            var doc = this._collection.findOneAndUpdate(
                { _id: model["_id"] },
                { $set: model },
                {
                    upsert: false,
                    returnOriginal: true
                }, (err, result) => {

                    if (err)
                        return reject(err);

                    resolve();

                    if (this._track)
                        this._dbService.entityCollection.insertOne({
                            date: Date.now(),
                            diff: deep.diff(result.value, model),
                            type: entityChangeType.Update,
                            userId: userId,
                            collection: this._collection.collectionName,
                            entityId: model["_id"]
                        });


                });

        });

    }

    public deleteOne(_id: string | ObjectID, userId?: string) {

        return new Promise((resolve, reject) => {

            this._collection.deleteOne({ _id: new ObjectID(_id) }).then(() => {


                if (this._track)
                    resolve();
                this._dbService.entityCollection.insertOne({
                    date: Date.now(),
                    diff: null,
                    type: entityChangeType.Delete,
                    userId: userId,
                    collection: this._collection.collectionName,
                    entityId: _id
                });

            }).catch((err) => {

                console.error(`error in deleting ${_id} from ${this._collection.collectionName}`)
                reject(err);
            });
        });
    }

    public insertOne(model: T, userId?: string): Promise<T> {


        return new Promise((resolve, reject) => {
            var objectId: ObjectID = new ObjectID();

            var doc = this._collection.findOneAndUpdate(
                { _id: objectId },
                { $set: model },
                {

                    upsert: true,
                    returnOriginal: false

                }, (err, result) => {

                    if (err)
                        return reject(err);

                    resolve(result.value);

                    if (this._track)
                        this._dbService.entityCollection.insertOne({
                            date: Date.now(),
                            diff: deep.diff({}, result.value),
                            type: entityChangeType.Create,
                            userId: userId,
                            collection: this._collection.collectionName,
                            entityId: objectId
                        });


                });

        });

    }


}
