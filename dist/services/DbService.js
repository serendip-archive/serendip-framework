"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const Server_1 = require("../Server");
/**
 * All collection names should accessed trough this enum
*/
var DbCollectionNames;
(function (DbCollectionNames) {
    DbCollectionNames[DbCollectionNames["Users"] = 0] = "Users";
    DbCollectionNames[DbCollectionNames["Entities"] = 1] = "Entities";
    DbCollectionNames[DbCollectionNames["EntityCache"] = 2] = "EntityCache";
    DbCollectionNames[DbCollectionNames["EntityChanges"] = 3] = "EntityChanges";
})(DbCollectionNames = exports.DbCollectionNames || (exports.DbCollectionNames = {}));
/**
 * Every functionality thats use database should use it trough this service
*/
class DbService {
    /**
     * set mongo collection with specified type
     * @param collectionName Collection name in MongoDB
     */
    constructor(collectionName) {
        this._collection = Server_1.Server.db.collection(DbCollectionNames[collectionName]);
    }
    /**
     * usage : db config in server startup ../Server.js
     *  creates empty collections from DbCollectionNames
     */
    static createCollectionsIfNotExists() {
        // getting collections from database
        Server_1.Server.db.collections(function (err, collections) {
            var currentCollections = collections.map(function (item) {
                return item.collectionName;
            });
            for (let cName in DbCollectionNames) {
                if (parseInt(cName).toString() != cName) {
                    if (currentCollections.indexOf(cName) == -1) {
                        Server_1.Server.db.createCollection(cName).then(function (collection) {
                            console.log(`collection ${collection.collectionName} created !`);
                        }).catch(function (err) {
                            console.log(`${cName} collection creation faced error`);
                        });
                    }
                }
            }
        });
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
exports.DbService = DbService;
