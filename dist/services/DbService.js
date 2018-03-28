"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class DbCollection {
    constructor(collection) {
        this._collection = collection;
    }
    find(query) {
        return new Promise((resolve, reject) => {
            var objectId = new mongodb_1.ObjectID();
            var doc = this._collection.find(query).toArray((err, results) => {
                if (err)
                    return reject(err);
                return resolve(results);
            });
        });
    }
    updateOne(model) {
        return new Promise((resolve, reject) => {
            model["_id"] = new mongodb_1.ObjectID(model["_id"]);
            var doc = this._collection.findOneAndUpdate({ _id: model["_id"] }, { $set: model }, {
                upsert: false,
                returnOriginal: false
            }, function (err, result) {
                if (err)
                    return reject(err);
                resolve(result.value);
            });
        });
    }
    deleteOne(_id) {
    }
    insertOne(model) {
        return new Promise((resolve, reject) => {
            var objectId = new mongodb_1.ObjectID();
            var doc = this._collection.findOneAndUpdate({ _id: objectId }, { $set: model }, {
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
exports.DbCollection = DbCollection;
/**
 * Every functionality thats use database should use it trough this service
*/
class DbService {
    constructor() {
        this.mongoCollections = [];
    }
    /**
     * set mongo collection with specified type
     * @param collectionName Collection name in MongoDB
     *
     *  filing Server.db that will use in entire system
     */
    async connect() {
        // Reading these two from .env file
        var mongoUrl = process.env.mongoUrl;
        var dbName = process.env.mongoDb;
        // Creating mongoDB client from mongoUrl
        var mongoClient = await mongodb_1.MongoClient.connect(mongoUrl);
        this.db = mongoClient.db(dbName);
    }
    async start() {
        await this.connect();
    }
    async collection(collectionName) {
        collectionName = collectionName.toLowerCase().trim();
        if (this.mongoCollections.indexOf(collectionName) === -1) {
            await this.db.createCollection(collectionName);
            this.mongoCollections.push(collectionName);
            console.log(`☑ collection ${collectionName} created .`);
        }
        return new DbCollection(this.db.collection(collectionName));
    }
}
DbService.dependencies = [];
exports.DbService = DbService;
