import { ObjectId } from "bson";

export enum entityChangeType {

    Delete = 0,
    Create = 1,
    Update = 2

}

export class EntityChangeModel {

    public _id?: string;
    public date: number;
    public type: entityChangeType;
    public diff: object;
    public userId?: string;
    public collection: string;
    public entityId: string | ObjectId;

}