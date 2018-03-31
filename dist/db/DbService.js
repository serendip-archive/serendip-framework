"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const _1 = require(".");
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
        var mongoCollectionObjects = await this.db.collections();
        mongoCollectionObjects.map((obj) => {
            this.mongoCollections.push(obj.collectionName);
        });
    }
    async collection(collectionName) {
        collectionName = collectionName.trim();
        if (this.mongoCollections.indexOf(collectionName) === -1) {
            await this.db.createCollection(collectionName);
            this.mongoCollections.push(collectionName);
            console.log(`☑ collection ${collectionName} created .`);
        }
        return new _1.DbCollection(this.db.collection(collectionName));
    }
}
DbService.dependencies = [];
exports.DbService = DbService;
