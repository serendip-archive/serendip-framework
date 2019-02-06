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
    find(query, skip, limit) {
        if (skip)
            skip = parseInt(skip);
        if (limit)
            limit = parseInt(limit);
        return new Promise((resolve, reject) => {
            if (skip >= 0 && limit > 0)
                this._collection
                    .find(query)
                    .skip(skip)
                    .limit(limit)
                    .toArray((err, results) => {
                    if (err)
                        return reject(err);
                    return resolve(results);
                });
            else
                this._collection.find(query).toArray((err, results) => {
                    if (err)
                        return reject(err);
                    return resolve(results);
                });
        });
    }
    count(query) {
        return this._collection.find(query).count();
    }
    aggregate(pipeline) {
        return this._collection.aggregate(pipeline);
    }
    updateOne(model, userId) {
        return new Promise((resolve, reject) => {
            model["_id"] = new mongodb_1.ObjectID(model["_id"]);
            model["_vdate"] = Date.now();
            this._collection.findOneAndUpdate({ _id: model["_id"] }, { $set: model }, {
                upsert: true,
                returnOriginal: false
            }, (err, result) => {
                if (err)
                    return reject(err);
                resolve(result.value);
                if (this._track)
                    this._dbService.entityChangeCollection.insertOne({
                        date: Date.now(),
                        model,
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
        return new Promise(async (resolve, reject) => {
            var model;
            var modelQuery = await this.find({ _id: new mongodb_1.ObjectID(_id) });
            if (modelQuery && modelQuery[0])
                model = modelQuery[0];
            else
                return reject("not found");
            this._collection
                .deleteOne({ _id: new mongodb_1.ObjectID(_id) })
                .then(async () => {
                if (this._track) {
                    await this._dbService.entityChangeCollection.insertOne({
                        date: Date.now(),
                        diff: null,
                        type: _1.entityChangeType.Delete,
                        userId: userId,
                        collection: this._collection.collectionName,
                        entityId: _id,
                        model: model
                    });
                }
                resolve(model);
            })
                .catch(err => {
                console.error(`error in deleting ${_id} from ${this._collection.collectionName}`);
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
            var doc = this._collection.insertOne(model, (err, result) => {
                if (err)
                    return reject(err);
                if (this._track)
                    this._dbService.entityChangeCollection.insertOne({
                        date: Date.now(),
                        model: model,
                        diff: deep.diff({}, model),
                        type: _1.entityChangeType.Create,
                        userId: userId,
                        collection: this._collection.collectionName,
                        entityId: model._id
                    });
                resolve(model);
            });
        });
    }
}
exports.DbCollection = DbCollection;
