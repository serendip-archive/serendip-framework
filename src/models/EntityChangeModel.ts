import { UserModel } from "./auth";

export enum entityChangeType {

    Delete = 0,
    Create = 1,
    Update = 2

}
export class EntityChangeModel {


    public type: entityChangeType;
    public data: object;
    public userId: string;


    public getUser(): UserModel {

        return undefined;

    }



}
