import { MongoClient, Db, ObjectID, Collection } from 'mongodb'

import { Server } from "../Server"
import { PromiseUtil } from '../utils'

import { ServiceInterface } from './'

export class DbCollection<T>{

    private _collection: Collection<T>;


    constructor(collection: Collection<T>) {

        this._collection = collection;

    }

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

/** 
 * Every functionality thats use database should use it trough this service
*/
export class DbService implements ServiceInterface {


    static dependencies = [];
    
    private mongoCollections: string[] = [];
    /**
     * Instance of mongodb database
     */
    private db: Db;

    /**
     * set mongo collection with specified type
     * @param collectionName Collection name in MongoDB
     *
     *  filing Server.db that will use in entire system
     */
    public async connect() {


        // Reading these two from .env file
        var mongoUrl: string = process.env.mongoUrl;
        var dbName: string = process.env.mongoDb;

        // Creating mongoDB client from mongoUrl
        var mongoClient = await MongoClient.connect(mongoUrl);

        this.db = mongoClient.db(dbName);


        console.log('DbService started successfully .');
    }

    async start() {

        await this.connect();

    }

    constructor() {



    }


    public async collection<T>(collectionName: string): Promise<DbCollection<T>> {

        collectionName = collectionName.toLowerCase().trim();

        if (this.mongoCollections.indexOf(collectionName) === -1) {
            await this.db.createCollection(collectionName);
            this.mongoCollections.push(collectionName);
            console.log(`collection ${collectionName} created .`);
        }

        return new DbCollection<T>(this.db.collection<T>(collectionName));

    }



}
