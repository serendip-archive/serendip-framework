import { ObjectId } from "bson";

export enum entityChangeType {
  Delete = 0,
  Create = 1,
  Update = 2
}

export class EntityChangeModel {
  constructor(model: EntityChangeModel) {
    if (model._id) this._id = model._id;

    this.date = model.date;
    this.type = model.type;
    this.model = model.model;
    this.diff = model.diff;
    this.userId = model.userId;
    this.collection = model.collection;
    this.entityId = model.entityId;
  }
  public _id?: string;
  public date: number;
  public type: entityChangeType;
  public model: any;
  public diff: any;
  public userId: string;
  public collection: string;
  public entityId: string | ObjectId;
}
