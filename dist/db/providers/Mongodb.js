"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const MongodbCollection_1 = require("./MongodbCollection");
class MongodbProvider {
    async collection(collectionName, track) {
        collectionName = collectionName.trim();
        // if (this.db.collection.indexOf(collectionName) === -1) {
        //   await this.db.createCollection(collectionName);
        //   this.mongoCollections.push(collectionName);
        //   if (Server.opts.logging == "info")
        //     console.log(`☑ collection ${collectionName} created .`);
        // }
        return new MongodbCollection_1.MongodbCollection(this.db.collection(collectionName), track, this);
    }
    async initiate(options) {
        try {
            // Creating mongoDB client from mongoUrl
            let connectOptions = {
                useNewUrlParser: true
            };
            if (options.authSource) {
                connectOptions.authSource = options.authSource;
            }
            if (options.user && options.password) {
                connectOptions.auth = {
                    user: options.user,
                    password: options.password
                };
            }
            var mongoClient = await mongodb_1.MongoClient.connect(options.mongoUrl, connectOptions);
            this.db = mongoClient.db(options.mongoDb);
            this.changes = await this.collection("EntityChanges", false);
        }
        catch (error) {
            throw new Error("\n\nUnable to connect to MongoDb. Error details: \n" + error.message);
        }
    }
}
exports.MongodbProvider = MongodbProvider;
