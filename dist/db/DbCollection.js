"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const deep = require("deep-diff");
const _1 = require(".");
const __1 = require("..");
class DbCollection {
    constructor(collection, track) {
        this._track = false;
        this._collection = collection;
        this._track = track;
        this._dbService = __1.Server.services["DbService"];
        if (this._collection.collectionName == "EntityChanges")
            this._track = false;
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
    updateOne(model, userId) {
        return new Promise((resolve, reject) => {
            model["_id"] = new mongodb_1.ObjectID(model["_id"]);
            var doc = this._collection.findOneAndUpdate({ _id: model["_id"] }, { $set: model }, {
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
                        type: _1.entityChangeType.Update,
                        userId: userId,
                        collection: this._collection.collectionName,
                        entityId: model["_id"]
                    });
            });
        });
    }
    deleteOne(_id, userId) {
        return new Promise((resolve, reject) => {
            this._collection.deleteOne({ _id: new mongodb_1.ObjectID(_id) }).then(() => {
                if (this._track)
                    resolve();
                this._dbService.entityCollection.insertOne({
                    date: Date.now(),
                    diff: null,
                    type: _1.entityChangeType.Delete,
                    userId: userId,
                    collection: this._collection.collectionName,
                    entityId: _id
                });
            }).catch((err) => {
                console.error(`error in deleting ${_id} from ${this._collection.collectionName}`);
                reject(err);
            });
        });
    }
    insertOne(model, userId) {
        return new Promise((resolve, reject) => {
            var objectId = new mongodb_1.ObjectID();
            var doc = this._collection.findOneAndUpdate({ _id: objectId }, { $set: model }, {
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
                        type: _1.entityChangeType.Create,
                        userId: userId,
                        collection: this._collection.collectionName,
                        entityId: objectId
                    });
            });
        });
    }
}
exports.DbCollection = DbCollection;
