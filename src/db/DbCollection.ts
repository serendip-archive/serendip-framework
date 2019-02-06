import { Collection, IndexOptions, ObjectID, AggregationCursor } from "mongodb";
import * as deep from "deep-diff";
import { DbService, entityChangeType } from ".";
import { Server } from "..";

export class DbCollection<T> {
  private _collection: Collection<T>;
  private _track = false;
  private _dbService: DbService;

  constructor(collection: Collection<T>, track: boolean) {
    this._collection = collection;

    this._track = track;

    this._dbService = Server.services["DbService"];

    if (this._collection.collectionName == "EntityChanges") this._track = false;
  }

  public async createIndex(fieldOrSpec: any, options: IndexOptions) {
    return this._collection.createIndex(fieldOrSpec, options);
  }

  public find(query, skip?: any, limit?: any): Promise<T[]> {
    if (skip) skip = parseInt(skip);

    if (limit) limit = parseInt(limit);

    return new Promise((resolve, reject) => {
      if (skip >= 0 && limit > 0)
        this._collection
          .find<T>(query)
          .skip(skip)
          .limit(limit)
          .toArray((err, results) => {
            if (err) return reject(err);
            return resolve(results);
          });
      else
        this._collection.find<T>(query).toArray((err, results) => {
          if (err) return reject(err);
          return resolve(results);
        });
    });
  }

  public count(query): Promise<Number> {
    return this._collection.find(query).count();
  }

  public aggregate(pipeline): AggregationCursor<T> {
    return this._collection.aggregate(pipeline);
  }

  public updateOne(model: T, userId?: string): Promise<T> {
    return new Promise((resolve, reject) => {
      model["_id"] = new ObjectID(model["_id"]);

      model["_vdate"] = Date.now();

      this._collection.findOneAndUpdate(
        { _id: model["_id"] },
        { $set: model },
        {
          upsert: true,
          returnOriginal: false
        },
        (err, result) => {
          if (err) return reject(err);

          resolve(result.value);

          if (this._track)
            this._dbService.entityChangeCollection.insertOne({
              date: Date.now(),
              model,
              diff: deep.diff(result.value, model),
              type: entityChangeType.Update,
              userId: userId,
              collection: this._collection.collectionName,
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

      this._collection
        .deleteOne({ _id: new ObjectID(_id) })
        .then(async () => {
          if (this._track) {
            await this._dbService.entityChangeCollection.insertOne({
              date: Date.now(),
              diff: null,
              type: entityChangeType.Delete,
              userId: userId,
              collection: this._collection.collectionName,
              entityId: _id,
              model: model
            });
          }

          resolve(model);
        })
        .catch(err => {
          console.error(
            `error in deleting ${_id} from ${this._collection.collectionName}`
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

      var doc = this._collection.insertOne(model, (err, result) => {
        if (err) return reject(err);

        if (this._track)
          this._dbService.entityChangeCollection.insertOne({
            date: Date.now(),
            model: model,
            diff: deep.diff({}, model),
            type: entityChangeType.Create,
            userId: userId,
            collection: this._collection.collectionName,
            entityId: model._id
          });

        resolve(model);
      });
    });
  }
}
