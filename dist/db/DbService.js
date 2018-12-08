"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const core_1 = require("../core");
const _1 = require(".");
const _ = require("underscore");
/**
 * Every functionality thats use database should use it trough this service
 */
class DbService {
    constructor() {
        this.mongoCollections = [];
    }
    static configure(options) {
        DbService.options = _.extend(DbService.options, options);
    }
    /**
     * set mongo collection with specified type
     * @param collectionName Collection name in MongoDB
     *
     *  filing Server.db that will use in entire system
     */
    async connect() {
        // Creating mongoDB client from mongoUrl
        let connectOptions = {
            useNewUrlParser: true
        };
        if (DbService.options.authSource) {
            connectOptions.authSource = DbService.options.authSource;
        }
        if (DbService.options.user && DbService.options.password) {
            connectOptions.auth = {
                user: DbService.options.user,
                password: DbService.options.password
            };
        }
        var mongoClient = await mongodb_1.MongoClient.connect(DbService.options.mongoUrl, connectOptions);
        this.db = mongoClient.db(DbService.options.mongoDb);
    }
    async start() {
        try {
            await this.connect();
        }
        catch (error) {
            throw new Error("\n\nUnable to connect to MongoDb. Error details: \n" + error.message);
        }
        var mongoCollectionObjects = await this.db.collections();
        mongoCollectionObjects.map(obj => {
            this.mongoCollections.push(obj.collectionName);
        });
        this.entityChangeCollection = await this.collection("EntityChanges", false);
    }
    async collection(collectionName, track) {
        collectionName = collectionName.trim();
        if (this.mongoCollections.indexOf(collectionName) === -1) {
            await this.db.createCollection(collectionName);
            this.mongoCollections.push(collectionName);
            if (core_1.Server.opts.logging == "info")
                console.log(`☑ collection ${collectionName} created .`);
        }
        return new _1.DbCollection(this.db.collection(collectionName), track);
    }
}
DbService.dependencies = [];
DbService.options = {
    mongoUrl: process.env.mongoUrl,
    mongoDb: process.env.mongoDb
};
exports.DbService = DbService;
