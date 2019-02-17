"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const models_1 = require("../models");
const deep = require("deep-diff");
const DbCollection_1 = require("../DbCollection");
class MongodbCollection extends DbCollection_1.DbCollection {
    constructor(collection, track, provider) {
        super();
        this.collection = collection;
        this.track = track;
        this.provider = provider;
    }
    async ensureIndex(fieldOrSpec, options) {
        await this.collection.createIndex(fieldOrSpec, options);
    }
    find(query, skip, limit) {
        if (skip)
            skip = parseInt(skip);
        if (limit)
            limit = parseInt(limit);
        return new Promise((resolve, reject) => {
            if (skip >= 0 && limit > 0)
                this.collection
                    .find(query)
                    .skip(skip)
                    .limit(limit)
                    .toArray((err, results) => {
                    if (err)
                        return reject(err);
                    return resolve(results);
                });
            else
                this.collection.find(query).toArray((err, results) => {
                    if (err)
                        return reject(err);
                    return resolve(results);
                });
        });
    }
    count(query) {
        return this.collection.find(query).count();
    }
    updateOne(model, userId) {
        return new Promise((resolve, reject) => {
            model["_id"] = new mongodb_1.ObjectID(model["_id"]);
            model["_vdate"] = Date.now();
            this.collection.findOneAndUpdate({ _id: model["_id"] }, { $set: model }, {
                upsert: true,
                returnOriginal: false
            }, (err, result) => {
                if (err)
                    return reject(err);
                resolve(result.value);
                if (this.track)
                    this.provider.changes.insertOne({
                        date: Date.now(),
                        model,
                        diff: deep.diff(result.value, model),
                        type: models_1.EntityChangeType.Update,
                        userId: userId,
                        collection: this.collection.collectionName,
                        entityId: model["_id"]
                    });
            });
        });
    }
    deleteOne(_id, userId) {
        return new Promise(async (resolve, reject) => {
            var model;
            var modelQuery = await this.find({ _id: new mongodb_1.ObjectID(_id) });
            if (modelQuery && modelQuery[0])
                model = modelQuery[0];
            else
                return reject("not found");
            this.collection
                .deleteOne({ _id: new mongodb_1.ObjectID(_id) })
                .then(async () => {
                if (this.track) {
                    await this.collection.insertOne({
                        date: Date.now(),
                        diff: null,
                        type: models_1.EntityChangeType.Delete,
                        userId: userId,
                        collection: this.collection.collectionName,
                        entityId: _id,
                        model: model
                    });
                }
                resolve(model);
            })
                .catch(err => {
                console.error(`error in deleting ${_id} from ${this.collection.collectionName}`);
                reject(err);
            });
        });
    }
    insertOne(model, userId) {
        model["_vdate"] = Date.now();
        return new Promise((resolve, reject) => {
            var objectId = new mongodb_1.ObjectID();
            if (model._id && typeof model._id == "string")
                model._id = new mongodb_1.ObjectID(model._id);
            if (!model._id)
                model._id = new mongodb_1.ObjectID();
            var doc = this.collection.insertOne(model, (err, result) => {
                if (err)
                    return reject(err);
                if (this.track)
                    this.provider.changes.insertOne({
                        date: Date.now(),
                        model: model,
                        diff: deep.diff({}, model),
                        type: models_1.EntityChangeType.Create,
                        userId: userId,
                        collection: this.collection.collectionName,
                        entityId: model._id
                    });
                resolve(model);
            });
        });
    }
}
exports.MongodbCollection = MongodbCollection;
