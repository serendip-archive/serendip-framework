import { Collection, IndexOptions, ObjectID } from "mongodb";

export class DbCollection<T>{

    private _collection: Collection<T>;


    constructor(collection: Collection<T>) {

        this._collection = collection;

    }

    public async createIndex(fieldOrSpec: any, options: IndexOptions) {

        return this._collection.createIndex(fieldOrSpec, options);
        
    };

    public find(query): Promise<T[]> {


        return new Promise((resolve, reject) => {
            var objectId: ObjectID = new ObjectID();

            var doc = this._collection.find<T>(query).toArray((err, results) => {

                if (err)
                    return reject(err);

                return resolve(results);


            });

        });

    }

    public updateOne(model: T): Promise<T> {


        return new Promise((resolve, reject) => {

            model["_id"] = new ObjectID(model["_id"]);


            var doc = this._collection.findOneAndUpdate(
                { _id: model["_id"] },
                { $set: model },
                {
                    upsert: false,
                    returnOriginal: false
                }, function (err, result) {

                    if (err)
                        return reject(err);

                    resolve(result.value);

                });

        });

    }

    public deleteOne(_id: string | ObjectID) {



    }

    public insertOne(model: T): Promise<T> {


        return new Promise((resolve, reject) => {
            var objectId: ObjectID = new ObjectID();

            var doc = this._collection.findOneAndUpdate(
                { _id: objectId },
                { $set: model },
                {

                    upsert: true,
                    returnOriginal: false

                }, function (err, result) {

                    if (err)
                        return reject(err);

                    resolve(result.value);

                });

        });

    }


}
