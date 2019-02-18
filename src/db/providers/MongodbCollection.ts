import { DbProviderInterface } from "../DbService";
import { Collection, ObjectID, IndexOptions } from "mongodb";
import { DbCollectionInterface } from "..";
import { EntityChangeType } from "../models";
import * as deep from "deep-diff";
import { DbCollection } from "../DbCollection";
import { MongodbProvider } from "./Mongodb";
export class MongodbCollection<T> extends DbCollection<T> {
  constructor(
    private collection: Collection,
    private track: boolean,
    private provider: MongodbProvider
  ) {
    super();
  }
  public async ensureIndex(fieldOrSpec: any, options: IndexOptions) {
    await this.collection.createIndex(fieldOrSpec, options);
  }
  public find(query, skip?: any, limit?: any): Promise<T[]> {
    if (skip) skip = parseInt(skip);
    if (limit) limit = parseInt(limit);
    return new Promise((resolve, reject) => {
      if (skip >= 0 && limit > 0)
        this.collection
          .find<T>(query)
          .skip(skip)
          .limit(limit)
          .toArray((err, results) => {
            if (err) return reject(err);
            return resolve(results);
          });
      else
        this.collection.find<T>(query).toArray((err, results) => {
          if (err) return reject(err);
          return resolve(
            results.map((p: any) => {
              p._id = p._id.toString();
              return p;
            })
          );
        });
    });
  }
  public count(query): Promise<Number> {
    return this.collection.find(query).count();
  }
  public updateOne(model: T, userId?: string): Promise<T> {
    return new Promise((resolve, reject) => {
      model["_id"] = new ObjectID(model["_id"]);
      model["_vdate"] = Date.now();
      this.collection.findOneAndUpdate(
        { _id: model["_id"] },
        { $set: model },
        {
          upsert: true,
          returnOriginal: false
        },
        (err, result) => {
          if (err) return reject(err);
          resolve(result.value);
          if (this.track)
            this.provider.changes.insertOne({
              date: Date.now(),
              model,
              diff: deep.diff(result.value, model),
              type: EntityChangeType.Update,
              userId: userId,
              collection: this.collection.collectionName,
              entityId: model["_id"]
            });
        }
      );
    });
  }
  public deleteOne(_id: string | ObjectID, userId?: string): Promise<T> {
    return new Promise(async (resolve, reject) => {
      var model: any;
      var modelQuery = await this.find({ _id: new ObjectID(_id) });
      if (modelQuery && modelQuery[0]) model = modelQuery[0];
      else return reject("not found");
      this.collection
        .deleteOne({ _id: new ObjectID(_id) })
        .then(async () => {
          if (this.track) {
            await this.collection.insertOne({
              date: Date.now(),
              diff: null,
              type: EntityChangeType.Delete,
              userId: userId,
              collection: this.collection.collectionName,
              entityId: _id,
              model: model
            });
          }
          resolve(model);
        })
        .catch(err => {
          console.error(
            `error in deleting ${_id} from ${this.collection.collectionName}`
          );
          reject(err);
        });
    });
  }
  public insertOne(model: T | any, userId?: string): Promise<T> {
    model["_vdate"] = Date.now();
    return new Promise((resolve, reject) => {
      var objectId: ObjectID = new ObjectID();
      if (model._id && typeof model._id == "string")
        model._id = new ObjectID(model._id);
      if (!model._id) model._id = new ObjectID();
      var doc = this.collection.insertOne(model, (err, result) => {
        if (err) return reject(err);
        if (this.track)
          this.provider.changes.insertOne({
            date: Date.now(),
            model: model,
            diff: deep.diff({}, model),
            type: EntityChangeType.Create,
            userId: userId,
            collection: this.collection.collectionName,
            entityId: model._id
          });
        resolve(model);
      });
    });
  }
}
