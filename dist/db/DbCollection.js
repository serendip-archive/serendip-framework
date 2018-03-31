"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class DbCollection {
    constructor(collection) {
        this._collection = collection;
    }
    async createIndex(fieldOrSpec, options) {
        return this._collection.createIndex(fieldOrSpec, options);
    }
    ;
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
